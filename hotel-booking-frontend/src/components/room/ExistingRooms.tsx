import {useEffect, useState} from 'react';
import {getAllRooms} from "../utils/ApiFunctions.ts";

const ExistingRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchRooms = async () => {
            setIsLoading(true);

            try {
                const result = await getAllRooms();
                setRooms(result);

            } catch (error: unknown) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("An unexpected error occurred");
                }
            } finally {
                setIsLoading(false);
            }
        };

        void fetchRooms();
    }, []);

    useEffect(() => {
        if (selectedRoomType === "") {
            setFilteredRooms(rooms);
        } else {
            const filteredRooms = rooms.filter((room) => room.roomType === selectedRoomType);
            setFilteredRooms(filteredRooms);
        }
        setCurrentPage(1);

    }, [rooms, selectedRoomType]);

    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalPages = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.ceil(totalPages / roomsPerPage);
    }

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    return (
        <div>

        </div>
    );
};

export default ExistingRooms;
