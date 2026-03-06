import {type ChangeEvent, useState} from "react";
import moment from "moment"
import {cancelBooking, getBookingByConfirmationCode} from "../../services/BookingService.ts";
import {FaSearch, FaTimesCircle} from "react-icons/fa";

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
        e: ChangeEvent<HTMLFormElement>
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
            setErrorMessage("");

        } catch (error: unknown) {
            setBookingInfo(emptyBookingInfo);
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unexpected error occurred");
            }

            setTimeout(() => {
                setErrorMessage("");
            }, 3000);

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
        <section className="mt-5 mb-5 container">
            <div className="text-center mb-4">
                <h2 className="hotel-color">Find My Booking</h2>
                <p className="text-muted">Enter your confirmation code to view or cancel booking</p>
            </div>

            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm border-0 mb-4" style={{backgroundColor: "#f8f9fa"}}>
                        <div className="card-body">
                            <form onSubmit={handleFormSubmit}>
                                <div className="input-group">
                                    <input
                                        className="form-control"
                                        id="confirmationCode"
                                        name="confirmationCode"
                                        value={confirmationCode}
                                        onChange={handleInputChange}
                                        placeholder="Enter confirmation code"
                                    />
                                    <button className="btn btn-hotel" type="submit">
                                        <FaSearch className="me-2" />
                                        Find Booking
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {isLoading && (
                        <div className="text-center py-3">
                            <div className="spinner-border hotel-color" role="status">
                                <span className="visually-hidden">Finding booking...</span>
                            </div>
                            <p className="text-muted mt-2 mb-0">Finding booking...</p>
                        </div>
                    )}

                    {!isLoading && errorMessage && (
                        <div className="alert alert-danger" role="alert">{errorMessage}</div>
                    )}

                    {!isLoading && bookingInfo.bookingConfirmationCode && (
                        <div className="card shadow-sm border-0 mb-3">
                            <div className="card-body">
                                <h5 className="hotel-color mb-3 fw-bold text-center">Booking Information</h5>

                                <div className="row g-2">
                                    <div className="col-sm-6"><strong>Confirmation Code:</strong></div>
                                    <div className="col-sm-6 text-sm-end text-success fw-semibold">{bookingInfo.bookingConfirmationCode}</div>

                                    <div className="col-sm-6"><strong>Room Number:</strong></div>
                                    <div className="col-sm-6 text-sm-end">{bookingInfo.room.id}</div>

                                    <div className="col-sm-6"><strong>Room Type:</strong></div>
                                    <div className="col-sm-6 text-sm-end">{bookingInfo.room.roomType}</div>

                                    <div className="col-sm-6"><strong>Check-in Date:</strong></div>
                                    <div className="col-sm-6 text-sm-end">
                                        {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                                    </div>

                                    <div className="col-sm-6"><strong>Check-out Date:</strong></div>
                                    <div className="col-sm-6 text-sm-end">
                                        {moment(bookingInfo.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")}
                                    </div>

                                    <div className="col-sm-6"><strong>Full Name:</strong></div>
                                    <div className="col-sm-6 text-sm-end">{bookingInfo.guestFullName}</div>

                                    <div className="col-sm-6"><strong>Email Address:</strong></div>
                                    <div className="col-sm-6 text-sm-end">{bookingInfo.guestEmail}</div>

                                    <div className="col-sm-6"><strong>Adults:</strong></div>
                                    <div className="col-sm-6 text-sm-end">{bookingInfo.numOfAdults}</div>

                                    <div className="col-sm-6"><strong>Children:</strong></div>
                                    <div className="col-sm-6 text-sm-end">{bookingInfo.numOfChildren}</div>

                                    <div className="col-sm-6"><strong>Total Guests:</strong></div>
                                    <div className="col-sm-6 text-sm-end fw-semibold">{bookingInfo.totalNumOfGuests}</div>
                                </div>

                                {!isDeleted && (
                                    <div className="d-flex justify-content-center mt-4">
                                        <button
                                            onClick={() => handleBookingCancellation(bookingInfo.id)}
                                            className="btn btn-outline-danger">
                                            <FaTimesCircle className="me-2" />
                                            Cancel Booking
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {isDeleted && (
                        <div className="alert alert-success mt-3 fade show" role="alert">
                            {successMessage}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FindBooking;
