import { useState, type ReactNode } from "react";
import jwt_decode from "jwt-decode";
import { AuthContext, type DecodedToken } from "../../context/AuthContext.ts";
import { setStorageUserId, setStorageUserRole, setStorageToken, clearStorageAuthData, getStorageToken } from "../../utils/storageUtils";

interface RequireAuthProps {
    children: ReactNode
}

const AuthProvider = ({children}: RequireAuthProps) => {
    const [user, setUser] = useState<DecodedToken | null>(() => {
        const token = getStorageToken();
        if (token) {
            try {
                return jwt_decode<DecodedToken>(token);
            } catch {
                clearStorageAuthData();
                return null;
            }
        }
        return null;
    });

    const handleLogin = (token: string) => {
        const decodedUser = jwt_decode<DecodedToken>(token)

        setStorageUserId(decodedUser.sub);
        setStorageUserRole(JSON.stringify(decodedUser.roles));
        setStorageToken(token);

        setUser(decodedUser);
    }

    const handleLogout = () => {
        clearStorageAuthData();

        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;
