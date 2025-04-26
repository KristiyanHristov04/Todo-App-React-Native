import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, Image, TouchableWithoutFeedback } from 'react-native'
import Toast from 'react-native-toast-message';
import { account, ID } from '../../appwrite.js';
import { useFormik } from 'formik';
import { registerSchema } from '../../schemas/registerSchema.js';

export default function Register() {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: registerSchema,
        onSubmit: handleClickRegister
    });

    async function handleClickRegister(values) {
        Keyboard.dismiss();

        try {
            const result = await account.create(
                ID.unique(),
                values.email,
                values.password,
            );

            Toast.show({
                type: 'success',
                text1: 'Успешно!',
                text2: 'Регистрирахте се успешно.',
                position: 'top',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 40,
            });
        } catch (error) {
            //console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Неуспешно!',
                text2: 'Грешка при регистрацията.',
                position: 'top',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 40,
            });
            return;
        } finally {
            formik.resetForm();
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                <View style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Text>Парола:</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder='Парола'
                        value={formik.values.password}
                        onChangeText={formik.handleChange('password')}
                        onBlur={formik.handleBlur('password')}
                        secureTextEntry={true}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <Text style={styles.error}>{formik.errors.password}</Text>
                    )}
                </View>
                <View style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Text>Потвърдете паролата:</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder='Потвърдете паролата'
                        value={formik.values.confirmPassword}
                        onChangeText={formik.handleChange('confirmPassword')}
                        onBlur={formik.handleBlur('confirmPassword')}
                        secureTextEntry={true}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <Text style={styles.error}>{formik.errors.confirmPassword}</Text>
                    )}
                </View>
                <View style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.button, pressed ? { opacity: 0.5 } : null
                        ]}
                        onPress={formik.handleSubmit}
                    >
                        <Text style={{ color: 'white' }}>Регистрация</Text>
                    </Pressable>
                </View>
                <Toast />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
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