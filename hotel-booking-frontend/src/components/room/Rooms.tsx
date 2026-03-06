import {useEffect, useState} from 'react';
import {deleteRoom, getAllRooms} from "../../services/RoomService.ts";
import {Col, Row} from "react-bootstrap";
import RoomFilter from "../shared/RoomFilter.tsx";
import type {IRoom} from "../../domain/IRoom.ts";
import RoomPaginator from "../shared/RoomPaginator.tsx";
import {FaEdit, FaPlus, FaTrashAlt} from "react-icons/fa";
import { Link } from "react-router-dom";

const Rooms = () => {
    const [rooms, setRooms] = useState<IRoom[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(4);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState<IRoom[]>([]);
    const [selectedRoomType] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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

    useEffect(() => {
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

    const handlePaginationClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const handleDeleteRoom = async (roomId: string) => {
        try {
            const result = await deleteRoom(roomId);
            if (result === "") {
                setSuccessMessage(`Room number ${roomId} was deleted`);
                void fetchRooms();
            } else {
                console.error(`Error deleting room: ${roomId}`);
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unexpected error occurred");
            }
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000)
    }

    const calculateTotalPages = (
        filteredRooms: IRoom[], roomsPerPage: number, rooms: IRoom[]
    ) => {
        const totalPages = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.ceil(totalPages / roomsPerPage);
    }

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    return (
        <>
            <div className="container col-md-8 col-lg-6">
                {successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}

                {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
            </div>

            {isLoading ? (
                <p>Loading rooms...</p>
            ) : (
                <>
                    <section className="mt-5 mb-5 container">
                        <div className="text-center mb-4">
                            <h2 className="hotel-color">Manage Rooms</h2>
                            <p className="text-muted">View, edit and manage all hotel rooms</p>
                        </div>

                        {/* Stats Card */}
                        <div className="row mb-4">
                            <div className="col-md-4 mb-3">
                                <div className="card text-center shadow-sm border-0" style={{backgroundColor: '#f8f9fa'}}>
                                    <div className="card-body py-3">
                                        <h4 className="hotel-color mb-0">{rooms.length}</h4>
                                        <small className="text-muted">Total Rooms</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="card text-center shadow-sm border-0" style={{backgroundColor: '#f8f9fa'}}>
                                    <div className="card-body py-3">
                                        <h4 className="hotel-color mb-0">{filteredRooms.length}</h4>
                                        <small className="text-muted">Filtered Results</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="card text-center shadow-sm border-0" style={{backgroundColor: '#f8f9fa'}}>
                                    <div className="card-body py-3">
                                        <h4 className="hotel-color mb-0">{new Set(rooms.map(r => r.roomType)).size}</h4>
                                        <small className="text-muted">Room Types</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Row>
                            <Col md={6} className="mb-3 mb-md-0">
                                <RoomFilter data={rooms} setFilteredData={setFilteredRooms}/>
                            </Col>

                            <Col md={6} className="d-flex justify-content-end align-items-center">
                                <Link to={"/add-room"} className="btn btn-hotel">
                                    <FaPlus className="me-2" /> Add New Room
                                </Link>
                            </Col>
                        </Row>

                        <div className="card shadow-sm border-0">
                            <div className="card-body p-0">
                                <table className="table table-hover mb-0">
                                    <thead style={{backgroundColor: '#f8f9fa'}}>
                                        <tr className="text-center">
                                            <th className="py-3">ID</th>
                                            <th className="py-3">Room Type</th>
                                            <th className="py-3">Price per Night</th>
                                            <th className="py-3">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {currentRooms.map((room) => (
                                        <tr key={room.id} className="text-center align-middle">
                                            <td className="fw-bold">{room.id}</td>
                                            <td>{room.roomType}</td>
                                            <td>{room.roomPrice}€</td>
                                            <td>
                                                <div className="d-flex gap-2 justify-content-center">
                                                    <Link to={`/edit-room/${room.id}`} className="btn btn-sm btn-outline-warning">
                                                        <FaEdit className="me-1" /> Edit
                                                    </Link>

                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDeleteRoom(room.id)}
                                                    >
                                                        <FaTrashAlt className="me-1" /> Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-4">
                            <RoomPaginator
                                currentPage={currentPage}
                                totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                                onPageChange={handlePaginationClick}/>
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default Rooms;
