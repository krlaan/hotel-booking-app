import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:9192',
});

export const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };
};

export interface ErrorResponse {
    message?: string;
    [key: string]: unknown;
}
