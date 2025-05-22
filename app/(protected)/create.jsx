import { View, Text, StyleSheet, TextInput, Pressable, Keyboard, KeyboardAvoidingView, Platform, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { databases, ID } from '../../appwrite.js';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import useAuth from '../../hooks/useAuth.jsx';
import { SelectList } from 'react-native-dropdown-select-list'
import { SafeAreaView } from 'react-native-safe-area-context';

const priorityOptions = [
    { key: '1', value: 'Висок' },
    { key: '2', value: 'Среден' },
    { key: '3', value: 'Нисък' },
];

export default function CreateTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(null);
    const [isTitleValid, setIsTitleValid] = useState(true);
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);
    const [isPriorityValid, setIsPriorityValid] = useState(true);

    const { user } = useAuth();

    async function createTask() {
        Keyboard.dismiss();
        let isValid = true;
        if (title.length === 0) {
            setIsTitleValid(false);
            isValid = false;
        }
        if (description.length === 0) {
            setIsDescriptionValid(false)
            isValid = false;
        }
        if (!priority || priority.length === 0) {
            setIsPriorityValid(false)
            isValid = false;
        }

        if (isTitleValid && isDescriptionValid && isValid) {
            try {
                const result = await databases.createDocument(
                    '680b37390022be2795b2',
                    '680b37460025b640d31e',
                    ID.unique(),
                    {
                        title: title,
                        description: description,
                        isDone: false,
                        priority: priority,
                        created_at: new Date().toISOString(),
                        user_id: user.$id
                    }
                )

                setTitle('');
                setDescription('');
                Toast.show({
                    type: 'success',
                    text1: 'Успешно!',
                    text2: 'Създадохте нова задача.',
                    position: 'top',
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 40,
                });
            }
            catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Неуспешно!',
                    text2: 'Грешка при създаването на нова задача.',
                    position: 'top',
                    visibilityTime: 3000,
                    autoHide: true,
                    bottomOffset: 40,
                });
                //console.error(error);
            }
        }

    }

    function handleOnChangeTitle(text) {
        setTitle(text);
        setDescription(text);
        if (text.length > 0) {
            setIsTitleValid(true);
            setIsDescriptionValid(true);
        } else {
            setIsTitleValid(false);
            setIsDescriptionValid(false);
        }
    }

    function handleOnChangeDescription(text) {
        console.log(text);
        setDescription(text);
        if (text.length > 0) {
            setIsDescriptionValid(true);
        } else {
            setIsDescriptionValid(false);
        }
    }

    function handleOnChangePriority() {
        if (priority) {
            setIsPriorityValid(true);
        } else {
            setIsPriorityValid(false);
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                    style={styles.container}
                >
                    <Image
                        style={styles.image}
                        source={require('../../assets/todo_logo.png')}
                    />
                    <View style={{ width: '100%', paddingHorizontal: 10 }}>
                        <Text>Заглавие:</Text>
                        <TextInput
                            style={styles.title}
                            onChangeText={handleOnChangeTitle}
                            placeholder='Заглавие'
                            maxLength={40}
                            value={title}
                        />
                        {!isTitleValid && <Text style={styles.error}>Моля, въведете заглавие!</Text>}
                    </View>
                    <View style={{ width: '100%', paddingHorizontal: 10 }}>
                        <Text>Описание:</Text>
                        <TextInput
                            style={styles.description}
                            onChangeText={handleOnChangeDescription}
                            placeholder='Описание'
                            value={description}
                            multiline
                            maxLength={200}
                        />
                        {!isDescriptionValid && <Text style={styles.error}>Моля, въведете описание!</Text>}
                    </View>
                    <View style={{ width: '100%', paddingHorizontal: 10 }}>
                        <Text>Приоритет:</Text>
                        <SelectList
                            setSelected={(val) => setPriority(val)}
                            data={priorityOptions}
                            save='value'
                            placeholder='Изберете приоритет'
                            search={false}
                            onSelect={() => handleOnChangePriority()}
                            boxStyles={{ borderRadius: 10, borderColor: 'black' }}
                            dropdownStyles={{ borderRadius: 10, borderColor: 'black' }}
                        />
                        {!isPriorityValid && <Text style={styles.error}>Моля, изберете приоритет!</Text>}
                    </View>
                    <View style={{ width: '100%', paddingHorizontal: 10 }}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.button, pressed ? { opacity: 0.5 } : null
                            ]}
                            onPress={createTask}
                        >
                            <Text style={{ color: 'white' }}>Добавяне на задача</Text>
                        </Pressable>
                    </View>
                    <Toast />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        alignContent: 'center',
        gap: 10
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 1,
        padding: 10,
    },
    description: {
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 1,
        padding: 10,
        minHeight: 100,
    },
    button: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        fontSize: 12,
    }
});