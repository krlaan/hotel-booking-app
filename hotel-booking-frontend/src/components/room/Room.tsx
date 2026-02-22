import {useEffect, useState} from "react";
import {getAllRooms} from "../utils/ApiFunctions.ts";
import RoomCard from "./RoomCard.tsx";
import type {Room as RoomType} from "../../types/Room.ts";
import {Col, Container, Row} from "react-bootstrap";
import RoomFilter from "../common/RoomFilter.tsx";
import RoomPaginator from "../common/RoomPaginator.tsx";

export const Room = () => {
    const [data, setData] = useState<RoomType[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(6);
    const [filteredData, setFilteredData] = useState<RoomType[]>([]);

    useEffect(() => {
        getAllRooms().then((data) => {
            setData(data);
            setFilteredData(data);
            setIsLoading(false);
        }).catch((error)=> {
            setErrorMessage(error.message);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>
            Loading rooms...
        </div>
    }
    if (errorMessage) {
        return <div className="text-danger">
            Error: {errorMessage}
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
        <Container>
            <Row>
                <Col md={6} className="mb-3 mb-md-0">
                    <RoomFilter data={data} setFilteredData={setFilteredData} />
                </Col>

                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <RoomPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>

            <Row>{renderRooms()}</Row>

            <Row>
                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <RoomPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Room;
