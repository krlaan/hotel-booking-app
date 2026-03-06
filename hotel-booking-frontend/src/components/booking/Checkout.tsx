import BookingForm from "./BookingForm.tsx";
import BookingSummary from "./BookingSummary.tsx";
import {useEffect, useState} from "react";
import {getRoomById} from "../../services/RoomService.ts";
import {useParams, useNavigate} from "react-router-dom";
import {bookRoom} from "../../services/BookingService.ts";
import {FaCar, FaParking, FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt} from "react-icons/fa";

type BookingData = {
    guestFullName: string;
    guestEmail: string;
    checkInDate: string;
    checkOutDate: string;
    numOfAdults: number;
    numOfChildren: number;
};

const Checkout = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [bookingData, setBookingData] = useState<BookingData | null>(null);
    const [payment, setPayment] = useState(0);
    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    });

    const {roomId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        if (roomId != null) {
            getRoomById(roomId).then((response) => {
                setRoomInfo(response);
                setIsLoading(false);

            }).catch((error) => {
                setError(error);
                setIsLoading(false);
            });
        }
    }, [roomId]);

    const handleBookingSubmit = (booking: BookingData, calculatedPayment: number) => {
        setBookingData(booking);
        setPayment(calculatedPayment);
        setShowModal(true);
    };

    const handleConfirmBooking = async () => {
        if (roomId == null) {
            setError("Room id is missing");
            return;
        }
        if (bookingData == null) {
            setError("Booking data is missing");
            return;
        }
        try {
            const confirmationCode = await bookRoom(roomId, bookingData);
            navigate("/booking-success", {state: {message: confirmationCode}});

        } catch (error: unknown) {
            const errorMsg = error instanceof Error ? error.message : "An unexpected error occurred";
            setError(errorMsg);
            navigate("/booking-success", {state: {error: errorMsg}});
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <section className="container">
                <div className="row align-items-stretch justify-content-center">
                    <div className="col-md-5">
                        <BookingForm onBookingSubmit={handleBookingSubmit}/>
                    </div>
                    <div className="col-md-4 mt-5 mb-5">
                        {isLoading ? (
                            <p>Loading room information...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <div className="room-info">
                                <img
                                    src={`data:image/png;base64,${roomInfo.photo}`}
                                    alt="Room photo"
                                    className="room-info-image"
                                />
                                <table className="table table-bordered">
                                    <tbody>
                                    <tr>
                                        <th>Room Type:</th>
                                        <td>{roomInfo.roomType}</td>
                                    </tr>
                                    <tr>
                                        <th>Price per night:</th>
                                        <td>${roomInfo.roomPrice}</td>
                                    </tr>
                                    <tr>
                                        <th>Room Service:</th>
                                        <td>
                                            <ul className="list-unstyled">
                                                <li>
                                                    <FaWifi/> Wifi
                                                </li>
                                                <li>
                                                    <FaTv/> Netflix Premium
                                                </li>
                                                <li>
                                                    <FaUtensils/> Breakfast
                                                </li>
                                                <li>
                                                    <FaWineGlassAlt/> Mini bar refreshment
                                                </li>
                                                <li>
                                                    <FaCar/> Car Service
                                                </li>
                                                <li>
                                                    <FaParking/> Parking Space
                                                </li>
                                                <li>
                                                    <FaTshirt/> Laundry
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Modal Overlay */}
            {showModal && bookingData && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button onClick={closeModal} className="modal-close-button">
                            ×
                        </button>
                        <BookingSummary
                            booking={bookingData}
                            payment={payment}
                            isFormValid={true}
                            onConfirm={handleConfirmBooking}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
