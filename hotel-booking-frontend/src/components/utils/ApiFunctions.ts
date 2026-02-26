import type {AxiosError} from "axios";
import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:9192',
})

export const getHeader = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

interface ErrorResponse {
    message?: string;
    [key: string]: unknown;
}

// This function gets all rooms from the database
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms");
        return result.data;

    } catch {
        throw new Error("Error fetching rooms");
    }
}

// This function gets a room by the id
export async function getRoomById(roomId: string) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`);
        return result.data;

    } catch {
        throw new Error("Error fetching room with id " + roomId);
    }
}

/* This function gets all available rooms from the database with a given date and a room type */
export async function getAvailableRooms(checkInDate: string, checkOutDate: string, roomType: string) {
    return await api.get(
        `rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
    );
}

// This function gets all room types from the database
export async function getRoomTypes() {
    try {
        const result = await api.get("/rooms/room/types");
        return result.data;

    } catch {
        throw new Error("Error fetching room types");
    }
}

// This function add a new room to the database
export async function addRoom(photo: File, roomType: string, roomPrice: string) {
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('roomType', roomType);
    formData.append('roomPrice', roomPrice);

    const result = await api.post('/rooms/add/new-room', formData)

    return result.status === 201; // true or false
}

// This function updates a room
export async function updateRoom(roomId: string, photo: File | null, roomType: string, roomPrice: string) {
    const formData = new FormData();
    if (photo instanceof File) {
        formData.append('photo', photo);
    }
    formData.append('roomType', roomType);
    formData.append('roomPrice', roomPrice);

    const result = await api.put(`/rooms/update/${roomId}`, formData);

    return result.data;
}

// This function deletes a room by the id
export async function deleteRoom(roomId: string) {
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`);
        return result.data;

    } catch {
        throw new Error("Error deleting room with id " + roomId);
    }
}

// This function saves a new booking to the database
export async function bookRoom(roomId: string, booking: {
    guestFullName: string;
    guestEmail: string;
    checkInDate: string;
    checkOutDate: string;
    numOfAdults: number;
    numOfChildren: number
}) {
    try {
        const result = await api.post<string>(`/bookings/room/${roomId}/booking`, booking);
        return result.data;

    } catch (err: unknown) {
        const error = err as AxiosError<ErrorResponse>;

        if (error.response?.data) {
            const errorData = error.response.data;
            const errorMessage = errorData.message ?? JSON.stringify(errorData);
            throw new Error(errorMessage);
        } else if (error.message) {
            throw new Error(`Error booking room: ${error.message}`);
        } else {
            throw new Error("Unknown error booking room");
        }
    }
}

// This function gets all bookings from the database
export async function getAllBookings() {
    try {
        const result = await api.get("/bookings/all-bookings");
        return result.data;

    } catch {
        throw new Error("Error fetching bookings");
    }
}

// This function gets booking by the confirmation code
export async function getBookingByConfirmationCode(confirmationCode: string) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
        return result.data;

    } catch {
        throw new Error("Error finding booking with confirmation code: " + confirmationCode);
    }
}

// This function cancels booking form the database
export async function cancelBooking(bookingId: string) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`);
        return result.data;

    } catch {
        throw new Error("Error cancelling booking with id " + bookingId);
    }
}

export async function registration(registration: string) {
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

// TODO: move it to separate file
interface LoginRequest {
    email: string;
    password: string;
}

export async function loginUser(login: LoginRequest) {
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

export async function getUserProfile(userId: string, token: string) {

    const response = await api.get(`users/profile/${userId}`, {
        headers: getHeader()
    })

    return response.data;
}
