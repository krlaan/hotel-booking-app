import type {IRoom} from "./IRoom.ts";

export interface IBooking {
    id: string;
    checkInDate: string;
    checkOutDate: string;
    guestFullName: string;
    guestEmail: string;
    numOfAdults: number;
    numOfChildren: number;
    totalNumOfGuest: number;
    bookingConfirmationCode: string;
    room : IRoom;
}
