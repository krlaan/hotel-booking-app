import {useEffect, useState} from "react";
import {cancelBooking, getAllBookings} from "../../services/BookingService.ts";
import BookingsTable from "./BookingsTable.tsx";

const Bookings = () => {
    const [bookingInfo, setBookingInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setTimeout(() => {
            getAllBookings().then((data) => {
                setBookingInfo(data);
                setIsLoading(false);
            }).catch((error) => {
                setErrorMessage(error.message);
                setIsLoading(false);
            });
        }, 1000)
    }, [])

    const handleBookingCancellation = async (bookingId: string) => {
        try {
            await cancelBooking(bookingId);
            const data = await getAllBookings();
            setBookingInfo(data);

        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unexpected error occurred");
            }
        }
    }

    return (
        <section style={{ background: "whitesmoke", minHeight: "100vh" }}>
            <div className="container py-4">
                <h2 className="fw-bold mt-4 text-center hotel-color">Bookings Management</h2>
                <p className="text-center text-muted mb-4">View, manage and track all hotel bookings</p>

                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}

                {isLoading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border hotel-color" role="status">
                            <span className="visually-hidden">Loading bookings...</span>
                        </div>
                        <p className="mt-3 text-muted">Loading bookings...</p>
                    </div>
                ) : (
                    <BookingsTable
                        bookingInfo={bookingInfo}
                        handleBookingCancellation={handleBookingCancellation} />
                )}
            </div>
        </section>
    );
};

export default Bookings;
