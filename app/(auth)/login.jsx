import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native'
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { account } from '../../appwrite.js';
import { useRouter } from 'expo-router';
import useAuth from '../../hooks/useAuth.jsx';

export default function Login() {
    const { checkIfLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const router = useRouter();

    function handleEmailChange(text) {
        setEmail(text);
        if (text.length === 0) {
            setIsEmailValid(false);
        } else {
            setIsEmailValid(true);
        }
    }

    function handlePasswordChange(text) {
        setPassword(text);
        if (text.length === 0) {
            setIsPasswordValid(false);
        } else {
            setIsPasswordValid(true);
        }
    }

    async function handleClickLogin() {
        Keyboard.dismiss();
        let isValid = true;
        if (email.length === 0) {
            console.log('Email is empty');
            setIsEmailValid(false);
            isValid = false;
        }

        if (password.length === 0) {
            setIsPasswordValid(false);
            isValid = false;
        }

        if (isValid) {
            try {
                const result = await account.createEmailPasswordSession(
                    email,
                    password,
                );
                Toast.show({
                    type: 'success',
                    text1: 'Успешно!',
                    text2: 'Влязохте успешно в профила си.',
                    position: 'top',
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 40,
                });
                setEmail('');
                setPassword('');
                await checkIfLoggedIn();
                router.replace('/');
            } catch (error) {
                console.error(error);
                Toast.show({
                    type: 'error',
                    text1: 'Неуспешно!',
                    text2: 'Грешка при влизането в вашия профил.',
                    position: 'top',
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 40,
                });
                return;
            }
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../assets/todo_logo.png')}
            />
            <View style={{ width: '100%', paddingHorizontal: 10 }}>
                <Text>Имейл:</Text>
                <TextInput
                    style={styles.inputField}
                    onChangeText={handleEmailChange}
                    placeholder='Имейл'
                    value={email}
                />
                {!isEmailValid && <Text style={styles.error}>Моля, въведете имейл!</Text>}
            </View>
            <View style={{ width: '100%', paddingHorizontal: 10 }}>
                <Text>Парола:</Text>
                <TextInput
                    style={styles.inputField}
                    onChangeText={handlePasswordChange}
                    placeholder='Парола'
                    value={password}
                    secureTextEntry={true}
                />
                {!isPasswordValid && <Text style={styles.error}>Моля, въведете парола!</Text>}
            </View>
            <View style={{ width: '100%', paddingHorizontal: 10 }}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button, pressed ? { opacity: 0.5 } : null
                    ]}
                    onPress={handleClickLogin}
                >
                    <Text style={{ color: 'white' }}>Вход</Text>
                </Pressable>
            </View>
            <Toast />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    inputField: {
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 1,
        padding: 10,
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