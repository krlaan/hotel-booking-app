import { STORAGE_KEYS } from '../constants/storageKeys';

// Token management
export const getStorageToken = (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

export const setStorageToken = (token: string): void => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

export const removeStorageToken = (): void => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

// User ID management
export const getStorageUserId = (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.USER_ID);
};

export const setStorageUserId = (userId: string): void => {
    localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
};

export const removeStorageUserId = (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER_ID);
};

// User Role management
export const getStorageUserRole = (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.USER_ROLE);
};

export const setStorageUserRole = (role: string): void => {
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
};

export const removeStorageUserRole = (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
};

// Clear all auth data
export const clearStorageAuthData = (): void => {
    removeStorageToken();
    removeStorageUserId();
    removeStorageUserRole();
};

// Check if user is authenticated
export const isStorageAuthenticated = (): boolean => {
    return !!getStorageToken();
};
