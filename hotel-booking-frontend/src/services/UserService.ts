import { api, getAuthHeader } from './BaseService.ts';

/* This is the function to get a single user */
export async function getUser(userId: string) {
    try {
        const result = await api.get(`/users/${userId}`, {
            headers: getAuthHeader()
        });
        return result.data;

    } catch {
        throw new Error("Error getting user profile");
    }
}

/* This is the function to delete a user */
export async function deleteUser(userId: string) {
    try {
        const result = await api.delete(`/users/delete/${userId}`, {
            headers: getAuthHeader()
        });
        return result.data;

    } catch {
        throw new Error("Error deleting user");
    }
}
