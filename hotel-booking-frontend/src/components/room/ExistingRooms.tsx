import {useEffect, useState} from 'react';
import {getAllRooms} from "../utils/ApiFunctions.ts";
import {Col} from "react-bootstrap";
import RoomFilter from "../common/RoomFilter.tsx";
import type {Room} from "../../types/Room.ts";
import RoomPaginator from "../common/RoomPaginator.tsx";

const ExistingRooms = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
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

    const calculateTotalPages = (
        filteredRooms: Room[], roomsPerPage: number, rooms: Room[]
    ) => {
        const totalPages = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.ceil(totalPages / roomsPerPage);
    }

    const handlePaginationClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    return (
        <>
            {isLoading ? (
                <p>Loading existing rooms...</p>
            ) : (
                <>
                    <section className="mt-5 mb-5 container">
                        <div className="d-flex justify-content-center mb-3 mt-5">
                            <h2>Existing rooms</h2>
                        </div>
                        <Col md={6} className="mb-3 mb-md-0">
                            <RoomFilter data={rooms} setFilteredData={setFilteredRooms}/>
                        </Col>
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>ID</th>
                                    <th>Room Type</th>
                                    <th>Room Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                            {currentRooms.map((room) => (
                                <tr key={room.id} className="text-center">
                                    <td>{room.id}</td>
                                    <td>{room.roomType}</td>
                                    <td>{room.roomPrice}</td>
                                    <td>
                                        <button>
                                            View / Edit
                                        </button>
                                        <button>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <RoomPaginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                            onPageChange={handlePaginationClick}/>
                    </section>
                </>
            )}
        </>
    );
};

export default ExistingRooms;
