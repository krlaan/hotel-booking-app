import {createContext, useState} from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({
    user: null,
    handleLogin: (token: string) => {},
    handleLogout: () => {},
});

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const handleLogin = (token: string) => {
        const decodedToken = jwt_decode(token);

        localStorage.setItem("userId", JSON.stringify(decodedToken.sub));
        localStorage.setItem("userRole", JSON.stringify(decodedToken.roles));
        localStorage.setItem("token", token);

        setUser(decodedToken);
    }

    const handleLogout = () => {

        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");

        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
