import type { AxiosError } from "axios";
import { api, type ErrorResponse } from './BaseService.ts';

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
        const result = await api.post(`/bookings/room/${roomId}/booking`, booking);
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

// This function cancels booking from the database
export async function cancelBooking(bookingId: string) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`);
        return result.data;

    } catch {
        throw new Error("Error cancelling booking with id " + bookingId);
    }
}

// This is the function to get user bookings by the user id
export async function getBookingsByUserId(userId: string) {
    try {
        const response = await api.get(`/bookings/user/${userId}/bookings`);
        return response.data;

    } catch {
        throw new Error("Failed to fetch bookings");
    }
}
