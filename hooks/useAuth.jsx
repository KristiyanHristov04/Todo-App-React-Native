import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function useAuth() {
    const { isAuthenticated, checkIfLoggedIn, user } = useContext(AuthContext);
    return { isAuthenticated, checkIfLoggedIn, user };
}