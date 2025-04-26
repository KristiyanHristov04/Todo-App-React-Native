import { useEffect, useState, createContext } from "react"
import { account } from "../appwrite.js";

export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkIfLoggedIn();
    }, []);

    async function checkIfLoggedIn() {
        try {
            const result = await account.get();
            console.log('Checking if logged in...');
            console.log(result);
            setIsAuthenticated(true);
            setUser(result);
        } catch (error) {
            setIsAuthenticated(false);
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, checkIfLoggedIn, user }}>
            {children}
        </AuthContext.Provider>
    )
}