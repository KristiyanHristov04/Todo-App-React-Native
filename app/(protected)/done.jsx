import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { databases } from '../../appwrite.js';
import { Query } from 'react-native-appwrite';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { formatDate } from '../../utils/formatDate.js';
import Toast from 'react-native-toast-message';
import useAuth from '../../hooks/useAuth.jsx';

export default function Done() {
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [shouldOrderByDateAsc, setShouldOrderByDateAsc] = useState(true);

    const { user } = useAuth();

    async function loadTasks() {
        try {
            const result = await databases.listDocuments(
                '680b37390022be2795b2',
                '680b37460025b640d31e',
                [
                    Query.equal('isDone', true),
                    Query.equal('user_id', user.$id),
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

    async function handleOnPressMoveToPendingTasks() {
        selectedTasks.map(async (taskId) => {
            try {
                await databases.updateDocument(
                    '680b37390022be2795b2',
                    '680b37460025b640d31e',
                    taskId,
                    {
                        isDone: false
                    }
                );
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Неуспешно!',
                    text2: 'Грешка при преместването на задачите.',
                    position: 'bottom',
                    visibilityTime: 2000,
                    autoHide: true,
                    bottomOffset: 40,
                });
                console.error(error);
                return;
            }
        });

        Toast.show({
            type: 'success',
            text1: 'Успешно!',
            text2: 'Преместихте избраните задачи.',
            position: 'bottom',
            visibilityTime: 2000,
            autoHide: true,
            bottomOffset: 40,
        });
        setTasks(tasks.filter((task) => !selectedTasks.includes(task.$id)));
        setSelectedTasks([]);
    }

    async function handleOnPressDeleteTasks() {
        selectedTasks.map(async (taskId) => {
            try {
                await databases.deleteDocument(
                    '680b37390022be2795b2',
                    '680b37460025b640d31e',
                    taskId
                );
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Неуспешно!',
                    text2: 'Грешка при изтриването на задачите',
                    position: 'bottom',
                    visibilityTime: 2000,
                    autoHide: true,
                    bottomOffset: 40,
                });
                console.error(error);
                return;
            }
        });

        Toast.show({
            type: 'success',
            text1: 'Успешно!',
            text2: 'Изтрихте избраните задачи',
            position: 'bottom',
            visibilityTime: 2000,
            autoHide: true,
            bottomOffset: 40,
        });
        setTasks(tasks.filter((task) => !selectedTasks.includes(task.$id)));
        setSelectedTasks([]);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Изпълнени задачи:</Text>
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
                    onPress={handleOnPressMoveToPendingTasks}>
                    <Text style={{ color: 'white' }}>
                        Премести в чакащи за изпълнение задачи
                    </Text>
                    <MaterialCommunityIcons name="timer-sand-empty" size={24} color="orange" />
                </Pressable>
            }
            {selectedTasks.length > 0 &&
                <Pressable
                    style={({ pressed }) => [styles.button, pressed ? { opacity: 0.5 } : null]}
                    onPress={handleOnPressDeleteTasks}>
                    <Text style={{ color: 'white' }}>
                        Изтриване на избраните задачи
                    </Text>
                    <Entypo name="circle-with-cross" size={24} color="red" />
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
        borderColor: '#6d30b3',
        borderWidth: 2,
        backgroundColor: '#f3e5f5',
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