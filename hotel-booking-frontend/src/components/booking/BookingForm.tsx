import {type ChangeEvent, useEffect, useState} from "react";
import {bookRoom, getRoomById} from "../utils/ApiFunctions.ts";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [roomPrice, setRoomPrice] = useState(0);
    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: 0,
        numOfChildren: 0,
    });

    const {roomId: roomIdParam} = useParams();
    const roomId = roomIdParam ? parseInt(roomIdParam, 10) : null;

    const navigate = useNavigate();

    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    })

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const {name, value} = e.target;
        setBooking({...booking, [name]: value});
        setErrorMessage("");
    }

    useEffect(() => {
        const getRoomPriceById = async () => {
            if (roomId == null) {
                return;
            }
            try {
                const result = await getRoomById(roomId);
                setRoomPrice(result.roomPrice);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("An unexpected error occurred");
                }
            }
        };

        void getRoomPriceById();
    }, [roomId])

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate);
        const checkOutDate = moment(booking.checkOutDate);

        const diffInDays = checkOutDate.diff(checkInDate);
        const price = roomPrice ? roomPrice : 0;

        return diffInDays * price;
    }

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numOfAdults);
        const childrenCount = parseInt(booking.numOfChildren);

        const totalCount = adultCount + childrenCount;

        return totalCount >= 1 && adultCount >= 1;
    }

    const isCheckoutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(booking.checkInDate)) {
            setErrorMessage("Check-out date must be before check-in date");
            return false;
        } else {
            setErrorMessage("");
            return true;
        }
    }

    const handleSubmit = (
        e: ChangeEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (!form.checkValidity() || !isGuestCountValid() || !isCheckoutDateValid()) {
            e.stopPropagation();
        } else {
            setIsSubmitted(true);
        }

        setIsValidated(true);
    }

    const handleBooking = async () => {
        if (roomId == null) {
            setErrorMessage("Room id is missing");
            return;
        }
        try {
            const confirmationCode = await bookRoom(roomId, booking);
            setIsSubmitted(true);
            navigate("/", {state:{message: confirmationCode}});

        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unexpected error occurred");
            }
            navigate("/", {state:{message: errorMessage}});
        }
    }

    return (
        <div>

        </div>
    );
};

export default BookingForm;
