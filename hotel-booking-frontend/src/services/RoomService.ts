import { api } from './BaseService.ts';

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
        `rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
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

    const result = await api.post('/rooms/add/new-room', formData);
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
