import {type ChangeEvent, type FormEvent, useState} from "react";
import moment from "moment"
import {cancelBooking, getBookingByConfirmationCode} from "../utils/ApiFunctions.ts";

const FindBooking = () => {
    const [confirmationCode, setConfirmationCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [bookingInfo, setBookingInfo] = useState({
        id: "",
        room: {id: "", roomType: ""},
        bookingConfirmationCode: "",
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuests: ""
    });

    const [isDeleted, setIsDeleted] = useState(false);

    const emptyBookingInfo = {
        id: "",
        room: {id: "", roomType: ""},
        bookingConfirmationCode: "",
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuests: ""
    }

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setConfirmationCode(e.target.value);
    }

    const handleFormSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await getBookingByConfirmationCode(confirmationCode);

            const totalGuests =
                Number(data.numOfAdults || 0) + Number(data.numOfChildren || 0);

            setBookingInfo({
                ...data,
                totalNumOfGuests: totalGuests.toString(),
            });

        } catch (error: unknown) {
            setBookingInfo(emptyBookingInfo);
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }

    const handleBookingCancellation = async (bookingId: string) => {
        try {
            await cancelBooking(bookingId);
            setIsDeleted(true);
            setSuccessMessage("Booking has been cancelled successfully!")
            setBookingInfo(emptyBookingInfo);
            setConfirmationCode("");
            setErrorMessage("");

        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unexpected error occurred");
            }
        }
        setTimeout(() => {
            setSuccessMessage("");
            setIsDeleted(false);
        }, 2000)
    }

    return (
        <>
            <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
                <h2>Find My Booking</h2>
                <form onSubmit={handleFormSubmit} className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            id="confirmationCode"
                            name="confirmationCode"
                            value={confirmationCode}
                            onChange={handleInputChange}
                            placeholder="Enter Confirmation Code"
                        />
                        <button className="btn btn-hotel input-group-text">
                            Find Booking
                        </button>
                    </div>
                </form>
                {isLoading ? (
                    <div>Finding booking...</div>
                ) : errorMessage ? (
                    <div className="text-danger">{errorMessage}</div>
                ) : bookingInfo.bookingConfirmationCode ? (
                    <div className="col-md-6 mt-4 mb-5">
                        <h3>Booking Information</h3>
                        <p className="text-success">Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
                        <p>Room Number: {bookingInfo.room.id}</p>
                        <p>Room Type: {bookingInfo.room.roomType}</p>
                        <p>
                            Check-in Date:{" "}
                            {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                        </p>
                        <p>
                            Check-out Date:{" "}
                            {moment(bookingInfo.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")}
                        </p>
                        <p>Full Name: {bookingInfo.guestFullName}</p>
                        <p>Email Address: {bookingInfo.guestEmail}</p>
                        <p>Adults: {bookingInfo.numOfAdults}</p>
                        <p>Children: {bookingInfo.numOfChildren}</p>
                        <p>Total Guests: {bookingInfo.totalNumOfGuests}</p>

                        {!isDeleted && (
                            <button
                                onClick={() => handleBookingCancellation(bookingInfo.id)}
                                className="btn btn-danger">
                                Cancel Booking
                            </button>
                        )}
                    </div>
                ) : (
                    <div>Find booking...</div>
                )}

                {isDeleted && <div className="alert alert-success mt-3 fade show">
                    {successMessage}
                </div>}
            </div>
        </>
    );
};

export default FindBooking;
