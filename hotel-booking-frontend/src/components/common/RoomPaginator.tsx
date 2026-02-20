type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (e: number) => void;
};

const RoomPaginator = ({currentPage, totalPages, onPageChange}: Props) => {
    const pageNumbers = Array.from({length : totalPages}, (_, i) => i + 1);

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                {pageNumbers.map((pageNumber) => (
                    <li
                        key={pageNumber}
                        className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default RoomPaginator;
