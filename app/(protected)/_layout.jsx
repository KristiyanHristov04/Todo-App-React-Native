import { Redirect, Tabs } from 'expo-router';
import { AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';

export default function ProtectedLayout() {

    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated === null) {
        return null;
    }

    if (!isAuthenticated) {
        return (
            <Redirect href="/(auth)/login" />
        )
    }

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#000',
        }}>
            <Tabs.Screen name="index" options={{
                title: 'Задачи',
                tabBarIcon: ({ color, size, focused }) => <MaterialCommunityIcons name={focused ? 'timer-sand-full' : 'timer-sand-empty'} size={24} color={color} />,
            }} />
            <Tabs.Screen
                name="create"
                options={{
                    title: 'Добавяне на задача',
                    tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? 'create' : 'create-outline'} size={24} color={'color'} />,
                }}
            />
            <Tabs.Screen
                name="done"
                options={{
                    title: 'Изпълнени задачи',
                    tabBarIcon: ({ color, size, focused }) => <AntDesign name={focused ? 'checkcircle' : 'checkcircleo'} size={24} color={'color'} />,
                }}
            />
            <Tabs.Screen
                name="logout"
                options={{
                    title: 'Изход',
                    tabBarIcon: ({ color, size, focused }) => <FontAwesome name={focused ? 'user' : 'user-o'} size={24} color={color} />,
                }}
            />
        </Tabs>
    )
}