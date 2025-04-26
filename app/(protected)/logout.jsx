import { View, Text, StyleSheet, Pressable } from 'react-native';
import { account } from '../../appwrite.js';
import useAuth from '../../hooks/useAuth.jsx';

export default function Logout() {

    const { checkIfLoggedIn, user } = useAuth();

    async function logout() {
        try {
            await account.deleteSession('current');
            await checkIfLoggedIn();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View
            style={styles.container}>
            <View style={{ width: '100%', paddingHorizontal: 10 }}>
                <Text style={{ textAlign: 'center' }}>В момента сте влезли с профила: <Text style={styles.email}>{user.email}</Text>. Сигурни ли сте, че искате да излезете от профила си?</Text>
            </View>
            <View style={{ width: '100%', paddingHorizontal: 10 }}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button, pressed ? { opacity: 0.5 } : null
                    ]}
                    onPress={logout}
                >
                    <Text style={{ color: 'white' }}>Излизане</Text>
                </Pressable>
            </View>
        </View>
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
    button: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    email: {
        textDecorationLine: 'underline',
    }
});