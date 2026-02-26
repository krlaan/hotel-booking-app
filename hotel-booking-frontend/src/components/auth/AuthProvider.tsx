import { useState, type ReactNode } from "react";
import jwt_decode from "jwt-decode";
import { AuthContext, type DecodedToken } from "./AuthContext";

interface RequireAuthProps {
    children: ReactNode
}

const AuthProvider = ({children}: RequireAuthProps) => {
    const [user, setUser] = useState<DecodedToken | null>(null)

    const handleLogin = (token: string) => {
        const decodedUser = jwt_decode<DecodedToken>(token)

        localStorage.setItem("userId", decodedUser.sub);
        localStorage.setItem("userRole", JSON.stringify(decodedUser.roles));
        localStorage.setItem("token", token);

        setUser(decodedUser);
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
    )
};

export default AuthProvider;
