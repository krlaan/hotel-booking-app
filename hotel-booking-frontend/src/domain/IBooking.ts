import type {IRoom} from "./IRoom.ts";
import type {IDomainId} from "./IDomainId.ts";

export interface IBooking extends IDomainId {
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
