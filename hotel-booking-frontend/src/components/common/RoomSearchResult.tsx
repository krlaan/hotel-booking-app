import {useState} from "react";
import {Button, Row} from "react-bootstrap";
import RoomCard from "../room/RoomCard.tsx";
import RoomPaginator from "./RoomPaginator.tsx";
import type {Room} from "../../types/Room.ts";

type Props = {
    results: Room[],
    onClearSearch: () => void,
}

const RoomSearchResult = ({results, onClearSearch}: Props) => {
    const [currentPage, setCurrentPage] = useState(1);

    const resultPerPage = 3;
    const totalResults = results.length;
    const totalPages = Math.ceil(totalResults / resultPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const startIndex = (currentPage - 1) * resultPerPage;
    const endIndex = startIndex + resultPerPage;
    const paginatedResult = results.slice(startIndex, endIndex);

    return (
        <>
            {results.length > 0 ? (
                <>
                    <h5 className="text-center mt-5">Search Result</h5>
                    <Row>
                        {paginatedResult.map((room) => (
                            <RoomCard key={room.id} room={room} />
                        ))}
                    </Row>
                    <Row>
                        {totalPages > resultPerPage && (
                            <RoomPaginator
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange} />
                        )}

                        <Button
                            variant="secondary"
                            onClick={onClearSearch}
                        >
                            Clear Search
                        </Button>
                    </Row>
                </>
            ): (
                <p></p>
            )}
        </>
    );
};

export default RoomSearchResult;
