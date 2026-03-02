import axios from 'axios';
import { getStorageToken } from '../utils/storageUtils';

export const api = axios.create({
    baseURL: 'http://localhost:9192',
});

export const getAuthHeader = () => {
    const token = getStorageToken();
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };
};

export interface ErrorResponse {
    message?: string;
    [key: string]: unknown;
}
