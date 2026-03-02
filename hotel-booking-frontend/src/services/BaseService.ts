import axios from 'axios';
import { getStorageToken } from '../utils/storageUtils';

export const api = axios.create({
    baseURL: 'http://localhost:9192',
});

// Automatically add token to all requests
api.interceptors.request.use((config) => {
    const token = getStorageToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface ErrorResponse {
    message?: string;
    [key: string]: unknown;
}
