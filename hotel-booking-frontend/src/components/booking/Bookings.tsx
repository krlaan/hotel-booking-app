import {useEffect, useState} from "react";
import {cancelBooking, getAllBookings} from "../utils/ApiFunctions.ts";
import Header from "../common/Header.tsx";
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
        <section className="container" style={{ background: "whitesmoke" }}>
            <Header title={"Bookings"} />
            {errorMessage && (
                <div className="text-danger">{errorMessage}</div>
            )}
            {isLoading ? (
                <div>Loading bookings...</div>
            ) : (
                <BookingsTable
                    bookingInfo={bookingInfo}
                    handleBookingCancellation={handleBookingCancellation} />
            )}

        </section>
    );
};

export default Bookings;
