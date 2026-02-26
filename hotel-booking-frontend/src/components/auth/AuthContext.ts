import { createContext } from "react";

export interface DecodedToken {
    sub: string;
    roles: string[];
    iat: number;
    exp: number;
}

export interface AuthContextType {
    user: DecodedToken | null;
    handleLogin: (token: string) => void;
    handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    handleLogin: () => {},
    handleLogout: () => {},
});
