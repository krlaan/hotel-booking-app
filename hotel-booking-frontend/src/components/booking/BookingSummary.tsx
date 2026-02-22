import moment from "moment";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

type BookingSummaryProps = {
    booking: {
        guestFullName: string;
        guestEmail: string;
        checkInDate: string;
        checkOutDate: string;
        numOfAdults: number;
        numOfChildren: number;
    };
    payment: number;
    isFormValid: boolean;
    onConfirm: () => void;
};

const BookingSummary = ({booking, payment, isFormValid, onConfirm}: BookingSummaryProps) => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const NumOfDays = checkOutDate.diff(checkInDate, "days");

    const [isBookingConfirmed, setIsBookingConfirmed] = useState<boolean>(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleConfirmBooking = () => {
        setIsProcessingPayment(true);

        setTimeout(() => {
            setIsProcessingPayment(false);
            setIsBookingConfirmed(true);
            onConfirm();
        }, 3000);
    }

    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success");
        }

    }, [isBookingConfirmed, navigate]);

    return (
        <div>

        </div>
    );
};

export default BookingSummary;
