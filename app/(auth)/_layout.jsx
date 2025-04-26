import { Tabs } from 'expo-router';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

export default function AuthLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#000',
        }}>
            <Tabs.Screen
                name="login"
                options={{
                    title: 'Вход',
                    tabBarIcon: ({ color, size, focused }) => <FontAwesome name={focused ? 'user' : 'user-o'} size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="register"
                options={{
                    title: 'Регистрация',
                    tabBarIcon: ({ color, size, focused }) => <MaterialCommunityIcons name={focused ? 'account-plus' : 'account-plus-outline'} size={24} color={color} />,
                }}
            />
        </Tabs>
    )
}