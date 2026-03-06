import {useEffect, useState} from "react";
import {parseISO} from "date-fns";
import DateSlider from "../shared/DateSlider.tsx";
import type {IBooking} from "../../domain/IBooking.ts";
import {FaTimesCircle} from "react-icons/fa";

type Props = {
    bookingInfo: IBooking[];
    handleBookingCancellation: (bookingId: string) => void;
};

const BookingsTable = ({bookingInfo, handleBookingCancellation}: Props) => {
    const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

    const filterBookings = (startDate: Date | null, endDate: Date | null) => {
        let filtered = bookingInfo;
        if (startDate && endDate) {
            filtered = bookingInfo.filter((booking) => {
                const bookingStartDate = parseISO(booking.checkInDate);
                const bookingsEndDate = parseISO(booking.checkOutDate);
                return bookingStartDate >= startDate && bookingsEndDate <= endDate && bookingsEndDate > startDate;
            });
        }
        setFilteredBookings(filtered);
    }

    useEffect(() => {
        setFilteredBookings(bookingInfo);
    }, [bookingInfo]);

    return (
        <div>
            <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />

            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <h5 className="card-title hotel-color mb-3">
                        Booking Details ({filteredBookings.length} {filteredBookings.length === 1 ? 'booking' : 'bookings'})
                    </h5>

                    {filteredBookings.length === 0 ? (
                        <div className="text-center py-5">
                            <p className="text-muted">No bookings found for the selected dates</p>
                        </div>
                    ) : (
                        <div>
                            <table className="table align-middle">
                                <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Confirmation Code</th>
                                    <th>Room Type</th>
                                    <th>Check-In</th>
                                    <th>Check-Out</th>
                                    <th>Guest Name</th>
                                    <th>Guest Email</th>
                                    <th>Adults</th>
                                    <th>Children</th>
                                    <th>Total Guests</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredBookings.map((booking, index) => (
                                    <tr key={booking.id}>
                                        <td className="fw-semibold">{index + 1}</td>
                                        <td>{booking.bookingConfirmationCode}</td>
                                        <td>{booking.room.roomType}</td>
                                        <td>{booking.checkInDate}</td>
                                        <td>{booking.checkOutDate}</td>
                                        <td>{booking.guestFullName}</td>
                                        <td><small className="text-muted">{booking.guestEmail}</small></td>
                                        <td className="text-center">{booking.numOfAdults}</td>
                                        <td className="text-center">{booking.numOfChildren}</td>
                                        <td className="text-center">{booking.totalNumOfGuest}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleBookingCancellation(booking.id)}
                                                title="Cancel Booking">
                                                <FaTimesCircle className="me-1" />
                                                Cancel
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingsTable;
