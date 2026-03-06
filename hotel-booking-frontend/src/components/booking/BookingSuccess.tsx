import {useLocation, useNavigate} from "react-router-dom";
import {FaCheckCircle, FaTimesCircle} from "react-icons/fa";

const BookingSuccess = () => {
    const location = useLocation();

    const navigate = useNavigate();

    const message = location.state?.message;

    // Extract confirmation code from message (format: "Room booked successfully! Your confirmation code is: CODE")
    const confirmationCode = message ? message.split(": ").pop() : "";

    return (
        <div className="container">
            <div className="row justify-content-center mt-5 mb-5">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-body text-center p-5">
                            {message ? (
                                <>
                                    <FaCheckCircle className="text-success mb-4" size={80}/>
                                    <h2 className="text-success mb-3">Booking Successful!</h2>
                                    <p className="text-muted mb-4">
                                        Your room has been successfully booked.
                                    </p>
                                    <div className="alert alert-success" role="alert">
                                        <strong>Confirmation Code:</strong>
                                        <div className="mt-2 fs-4 fw-bold">{confirmationCode}</div>
                                    </div>
                                    <p className="text-muted small mb-4">
                                        Please save this confirmation code.
                                    </p>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                        <button
                                            className="btn btn-hotel px-4"
                                            onClick={() => navigate("/browse-all-rooms")}
                                        >
                                            Browse More Rooms
                                        </button>
                                        <button
                                            className="btn btn-outline-secondary px-4"
                                            onClick={() => navigate("/profile")}
                                        >
                                            My Bookings
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <FaTimesCircle className="text-danger mb-4" size={80}/>
                                    <h2 className="text-danger mb-3">Booking Failed</h2>
                                    <p className="text-muted mb-4">
                                        We encountered an error while processing your booking.
                                    </p>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
                                        <button
                                            className="btn btn-hotel px-4"
                                            onClick={() => navigate(-1)}
                                        >
                                            Try Again
                                        </button>
                                        <button
                                            className="btn btn-outline-secondary px-4"
                                            onClick={() => navigate("/browse-all-rooms")}
                                        >
                                            Browse Rooms
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccess;
