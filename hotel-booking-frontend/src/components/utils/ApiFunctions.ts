import axios from 'axios';
import type { AxiosError } from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:9192',
})

// This function add a new room to the database
export async function addRoom(photo: File, roomType: string, roomPrice: string) {
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('roomType', roomType);
    formData.append('roomPrice', roomPrice);

    const result = await api.post('/rooms/add/new-room', formData)

    return result.status === 201; // true or false
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

// This function gets all rooms from the database
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms");
        return result.data;

    } catch {
        throw new Error("Error fetching rooms");
    }
}

// This function deletes a room by the id
export async function deleteRoom(roomId: number) {
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`);
        return result.data;

    } catch {
        throw new Error("Error deleting room with id " + roomId);
    }
}

// This function updates a room
export async function updateRoom(roomId: number, photo: File | null, roomType: string, roomPrice: string) {
    const formData = new FormData();
    if (photo instanceof File) {
        formData.append('photo', photo);
    }
    formData.append('roomType', roomType);
    formData.append('roomPrice', roomPrice);

    const result = await api.put(`/rooms/update/${roomId}`, formData);

    return result.data;
}

// This function gets a room by the id
export async function getRoomById(roomId: number) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`);
        return result.data;

    } catch {
        throw new Error("Error fetching room with id " + roomId);
    }
}

// This function saves a new booking to the database
export async function bookRoom(roomId: number, booking: {
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
        const error = err as AxiosError;

        if (error.response?.data) {
            const errorData = error.response.data;
            // Handle both string and object error responses
            const errorMessage = typeof errorData === 'string' ? errorData : (errorData as any).message || String(errorData);
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
