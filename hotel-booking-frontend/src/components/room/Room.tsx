import {useEffect, useState} from "react";
import {getAllRooms} from "../utils/ApiFunctions.ts";
import RoomCard from "./RoomCard.tsx";
import type {Room} from "../../types/Room.ts";

const Room = () => {
    const [data, setData] = useState<Room[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage, setRoomsPerPage] = useState(6);
    const [filteredData, setFilteredData] = useState<Room[]>([]);

    useEffect(() => {
        setIsLoading(true);

        getAllRooms().then((data) => {
            setData(data);
            setFilteredData(data);
            setIsLoading(false);
        }).catch((error)=> {
            setError(error.message);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>
            Loading rooms...
        </div>
    }
    if (error) {
        return <div className="text-danger">
            Error: {error}
        </div>;
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const totalPages = Math.ceil(filteredData.length / roomsPerPage);

    const renderRooms = () => {
        const startIndex = (currentPage - 1) * roomsPerPage;
        const endIndex = startIndex + roomsPerPage;
        return filteredData.slice(startIndex, endIndex)
            .map((room) => <RoomCard key={room.id} room={room} />);
    }

    return (
        <div>

        </div>
    );
};

export default Room;
