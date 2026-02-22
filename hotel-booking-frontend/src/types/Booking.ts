import type {Room} from "./Room.ts";

export type Booking = {
    bookingId?: number;
    checkInDate: string;
    checkOutDate: string;
    guestFullName: string;
    guestEmail: string;
    numOfAdults: number;
    numOfChildren: number;
    totalNumOfGuest: number;
    bookingConfirmationCode: string;
    room : Room;
};
