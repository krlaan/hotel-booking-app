import type { AxiosError } from "axios";
import { api, type ErrorResponse } from './BaseService.ts';
import type { ILoginDto } from "../types/ILoginDto";
import type { IRegisterDto } from "../types/IRegisterDto";

/* This function register a new user */
export async function registerUser(registration: IRegisterDto) {
    try {
        const result = await api.post(`/auth/register-user`, registration);
        return result.data;

    } catch (err: unknown) {
        const error = err as AxiosError<ErrorResponse>;

        if (error.response?.data) {
            const errorData = error.response.data;
            const errorMessage = errorData.message ?? JSON.stringify(errorData);
            throw new Error(errorMessage);

        } else if (error.message) {
            throw new Error(`Error register user ${error.message}`);
        } else {
            throw new Error("Unknown registration error");
        }
    }
}

/* This function login a registered user */
export async function loginUser(login: ILoginDto) {
    try {
        const result = await api.post(`/auth/login`, login);

        if (result.status >= 200 && result.status < 300) {
            return result.data;
        } else {
            return null;
        }
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
}
