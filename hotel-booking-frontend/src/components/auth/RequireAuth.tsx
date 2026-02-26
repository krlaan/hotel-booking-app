import {Navigate, useLocation} from "react-router-dom"
import type {ReactNode} from "react";

interface RequireAuthProps {
    children: ReactNode
}

const RequireAuth = ({children}: RequireAuthProps) => {
    const user = localStorage.getItem("userId");

    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{path: location.pathname}}/>
    }
    return children;
}
export default RequireAuth
