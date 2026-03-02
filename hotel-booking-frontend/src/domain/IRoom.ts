import type {IDomainId} from "./IDomainId.ts";

export interface IRoom extends IDomainId {
    roomType: string;
    roomPrice: string;
    photo: string;
}
