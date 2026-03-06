import {Navigate, useLocation} from "react-router-dom"
import type {ReactNode} from "react";
import { getStorageUserRole } from "../../utils/storageUtils";

interface RequireAdminAuthProps {
    children: ReactNode
}

const RequireAdminAuth = ({children}: RequireAdminAuthProps) => {
    const userRoleStr = getStorageUserRole();
    const location = useLocation();

    if (!userRoleStr) {
        return <Navigate to="/login" state={{path: location.pathname}}/>
    }
    let isAdmin = false;

    try {
        const roles = JSON.parse(userRoleStr);
        isAdmin = Array.isArray(roles) && roles.includes('ROLE_ADMIN');

    } catch {
        return <Navigate to="/login" state={{path: location.pathname}}/>
    }

    if (!isAdmin) {
        return <Navigate to="/" />
    }

    return children;
}

export default RequireAdminAuth
