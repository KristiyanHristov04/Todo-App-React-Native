import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, Image, TouchableWithoutFeedback, ScrollView } from 'react-native'
import Toast from 'react-native-toast-message';
import { account } from '../../appwrite.js';
import { useRouter } from 'expo-router';
import useAuth from '../../hooks/useAuth.jsx';
import { useFormik } from 'formik';
import { loginSchema } from '../../schemas/loginSchema.js';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
    const { checkIfLoggedIn } = useAuth();

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: handleClickLogin
    })

    async function handleClickLogin(values) {
        Keyboard.dismiss();

        try {
            const result = await account.createEmailPasswordSession(
                values.email,
                values.password,
            );

            await checkIfLoggedIn();
            router.replace('/');
        } catch (error) {
            if (error.code === 401) {
                Toast.show({
                    type: 'error',
                    text1: 'Неуспешно!',
                    text2: 'Неправилен имейл адрес или парола.',
                    position: 'top',
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 40,
                });
            } else {
                // console.error(error);
                Toast.show({
                    type: 'error',
                    text1: 'Неуспешно!',
                    text2: 'Възникна грешка при влизането във вашия профил.',
                    position: 'top',
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 40,
                });
            }


            return;
        } finally {
            formik.resetForm();
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={styles.container}
                    >
                        <Image
                            style={styles.image}
                            source={require('../../assets/todo_logo.png')}
                        />

                        <View style={styles.inputWrapper}>
                            <Text>Имейл:</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder='Имейл'
                                onChangeText={formik.handleChange('email')}
                                onBlur={formik.handleBlur('email')}
                                value={formik.values.email}
                                keyboardType='email-address'
                            />
                            {formik.touched.email && formik.errors.email && (
                                <Text style={styles.error}>{formik.errors.email}</Text>
                            )}
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text>Парола:</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder='Парола'
                                value={formik.values.password}
                                onChangeText={formik.handleChange('password')}
                                onBlur={formik.handleBlur('password')}
                                secureTextEntry
                            />
                            {formik.touched.password && formik.errors.password && (
                                <Text style={styles.error}>{formik.errors.password}</Text>
                            )}
                        </View>

                        <View style={styles.inputWrapper}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.button, pressed && { opacity: 0.5 }
                                ]}
                                onPress={formik.handleSubmit}
                            >
                                <Text style={{ color: 'white' }}>Вход</Text>
                            </Pressable>
                        </View>

                        <Toast />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    container: {
        width: '100%',
        alignItems: 'center',
        gap: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    inputWrapper: {
        width: '100%',
        paddingHorizontal: 10,
    },
    inputField: {
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 1,
        padding: 10,
        marginTop: 4,
    },
    button: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});