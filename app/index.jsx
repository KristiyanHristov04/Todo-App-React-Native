import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { databases } from '../appwrite.js';
import { Query } from 'react-native-appwrite';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { formatDate } from '../utils/formatDate.js';
import Toast from 'react-native-toast-message';

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [shouldOrderByDateAsc, setShouldOrderByDateAsc] = useState(true);

    async function loadTasks() {
        try {
            const result = await databases.listDocuments(
                '680b37390022be2795b2',
                '680b37460025b640d31e',
                [
                    Query.equal('isDone', false),
                    shouldOrderByDateAsc ?
                        Query.orderAsc('created_at') : Query.orderDesc('created_at')
                ]
            );

            setTasks(result.documents);
        }
        catch (error) {
            console.error(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadTasks();
        }, [shouldOrderByDateAsc])
    )

    function handleOnPressTask(id) {
        if (selectedTasks.includes(id)) {
            setSelectedTasks(selectedTasks.filter((taskId) => taskId !== id));
        } else {
            setSelectedTasks([...selectedTasks, id]);
        }
    }

    async function handleOnPressMoveToDoneTasks() {
        selectedTasks.map(async (taskId) => {
            try {
                await databases.updateDocument(
                    '680b37390022be2795b2',
                    '680b37460025b640d31e',
                    taskId,
                    {
                        isDone: true
                    }
                );
            } catch (error) {
                console.error(error);
                Toast.show({
                    type: 'error',
                    text1: 'Неуспешно!',
                    text2: 'Грешка при преместването на задачите',
                    position: 'bottom',
                    visibilityTime: 2000,
                    autoHide: true,
                    bottomOffset: 40,
                });
                return;
            }
        });

        Toast.show({
            type: 'success',
            text1: 'Успешно!',
            text2: 'Преместихте задачите.',
            position: 'bottom',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 40,
        });
        setTasks(tasks.filter((task) => !selectedTasks.includes(task.$id)));
        setSelectedTasks([]);
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Задачи:</Text>
            <Pressable
                style={({ pressed }) => [styles.button, pressed ? { opacity: 0.5 } : null]}
                onPress={() => setShouldOrderByDateAsc(!shouldOrderByDateAsc)}>
                <Text style={{ color: 'white' }}>Сортирай по дата <AntDesign name={shouldOrderByDateAsc ? 'arrowdown' : 'arrowup'} /></Text>
            </Pressable>

            <FlatList
                style={{ width: '100%', paddingTop: 10 }}
                data={tasks}
                renderItem={({ item }) => {
                    const isSelected = selectedTasks.includes(item.$id);
                    return (
                        <Pressable onPress={() => handleOnPressTask(item.$id)}>
                            <View style={[
                                styles.taskItem,
                                isSelected ? styles.taskItemSelected : null
                            ]}>
                                <View style={styles.taskContent}>
                                    <Text style={styles.taskTitle}>{item.title}</Text>
                                    <Text style={styles.taskDescription}>{item.description}</Text>
                                </View>
                                <View style={styles.taskFooter}>
                                    <Text style={styles.taskDate}><AntDesign name='calendar' /> {formatDate(item.created_at)}</Text>
                                </View>
                            </View>
                        </Pressable>
                    );
                }}
                keyExtractor={(item) => item.$id}
            />
            {selectedTasks.length > 0 &&
                <Pressable
                    style={({ pressed }) => [styles.button, pressed ? { opacity: 0.5 } : null]}
                    onPress={handleOnPressMoveToDoneTasks}>
                    <Text style={{ color: 'white' }}>
                        Премести в изпълнени задачи
                    </Text>
                    <AntDesign name="checkcircleo" size={24} color="green" />
                </Pressable>
            }
            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        marginTop: 10,
        fontSize: 32,
    },
    taskItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 12,
        width: '90%',
        borderRadius: 8,
        borderColor: '#eee',
        borderWidth: 2,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        minHeight: 100,
        justifyContent: 'space-between',
    },
    taskItemSelected: {
        borderColor: 'green',
        borderWidth: 2,
        backgroundColor: '#e8f5e9',
    },
    taskContent: {
        marginBottom: 10,
    },
    taskTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    taskDescription: {
        fontSize: 14,
        color: '#555',
    },
    taskFooter: {
        alignItems: 'flex-end',
    },
    taskDate: {
        fontSize: 12, 
        color: '#888',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: '#000',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    }
});