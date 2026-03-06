import {type ChangeEvent, useEffect, useState} from "react";
import {getRoomById} from "../../services/RoomService.ts";
import {useParams} from "react-router-dom";
import moment from "moment";
import {Form, FormControl} from "react-bootstrap";
import {getStorageUserId} from "../../utils/storageUtils";

type BookingData = {
    guestFullName: string;
    guestEmail: string;
    checkInDate: string;
    checkOutDate: string;
    numOfAdults: number;
    numOfChildren: number;
};

type BookingFormProps = {
    onBookingSubmit?: (bookingData: BookingData, payment: number) => void;
};

const BookingForm = ({onBookingSubmit}: BookingFormProps) => {
    const [isValidated, setIsValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [roomPrice, setRoomPrice] = useState(0);
    const [roomType, setRoomType] = useState("");
    const [maxGuests, setMaxGuests] = useState(4);

    let currentUser = getStorageUserId()

    if (!currentUser) {
        currentUser = "";
    }

    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: currentUser,
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: 0,
        numOfChildren: 0,
    });

    const {roomId} = useParams();

    const getRoomCapacityByType = (type: string): number => {
        const normalizedType = type.toLowerCase();

        if (normalizedType.includes("single")) {
            return 1;
        }

        if (normalizedType.includes("double") ||
            normalizedType.includes("twin")) {
            return 2;
        }

        if (normalizedType.includes("deluxe") ||
            normalizedType.includes("suite") ||
            normalizedType.includes("family")) {
            return 4;
        }

        // Fallback for unknown/custom room types
        return 4;
    }

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const {name, value} = e.target;

        let parsedValue: string | number = value;
        if (name === "numOfAdults" || name === "numOfChildren") {
            const numericValue = Math.max(0, parseInt(value, 10) || 0);

            const otherGuestCount = name === "numOfAdults" ? booking.numOfChildren : booking.numOfAdults;

            const maxAllowedForCurrentField = Math.max(0, maxGuests - otherGuestCount);

            parsedValue = Math.min(numericValue, maxAllowedForCurrentField);
        }

        setBooking({...booking, [name]: parsedValue});
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
                setRoomType(result.roomType);

                setMaxGuests(getRoomCapacityByType(result.roomType));

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

        const diffInDays = checkOutDate.diff(checkInDate, 'days');

        return diffInDays * roomPrice;
    }

    const isCheckoutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMessage("Check-out date must be after check-in date");
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
        if (!form.checkValidity() || !isCheckoutDateValid()) {
            e.stopPropagation();
        } else {
            if (onBookingSubmit) {
                onBookingSubmit(booking, calculatePayment());
            }
        }

        setIsValidated(true);
    }

    return (
        <>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-body mt-5">
                            <h4 className="card-title">Reserve Room</h4>

                            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="guestFullName" className="hotel-color">
                                        Full name
                                    </Form.Label>
                                    <FormControl
                                        required
                                        type="text"
                                        id="guestFullName"
                                        name="guestFullName"
                                        value={booking.guestFullName}
                                        placeholder="Enter your fullname"
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your full name.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="guestEmail" className="hotel-color">
                                        Email
                                    </Form.Label>
                                    <FormControl
                                        required
                                        type="email"
                                        id="guestEmail"
                                        name="guestEmail"
                                        value={booking.guestEmail}
                                        placeholder="Enter your email"
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid email address.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <fieldset>
                                    <legend>Lodging Period</legend>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label htmlFor="checkInDate" className="hotel-color">
                                                Check-in date
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type="date"
                                                id="checkInDate"
                                                name="checkInDate"
                                                value={booking.checkInDate}
                                                placeholder="check-in-date"
                                                min={moment().format("YYYY-MM-DD")}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please select a check in date.
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className="col-6">
                                            <Form.Label htmlFor="checkOutDate" className="hotel-color">
                                                Check-out date
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type="date"
                                                id="checkOutDate"
                                                name="checkOutDate"
                                                value={booking.checkOutDate}
                                                placeholder="check-out-date"
                                                min={moment().format("YYYY-MM-DD")}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please select a check out date.
                                            </Form.Control.Feedback>
                                        </div>
                                        {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                                    </div>
                                </fieldset>

                                <fieldset>
                                    <legend>Number of Guest</legend>
                                    <p className="text-muted small mb-2">
                                        Room type: <strong>{roomType || "Selected room"}</strong> | Max
                                        guests: <strong>{maxGuests}</strong>
                                    </p>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label htmlFor="numOfAdults" className="hotel-color">
                                                Adults
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type="number"
                                                id="numOfAdults"
                                                name="numOfAdults"
                                                value={booking.numOfAdults}
                                                min={1}
                                                max={maxGuests}
                                                placeholder="0"
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please select at least 1 adult.
                                            </Form.Control.Feedback>
                                        </div>
                                        <div className="col-6">
                                            <Form.Label htmlFor="numOfChildren" className="hotel-color">
                                                Children
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type="number"
                                                id="numOfChildren"
                                                name="numOfChildren"
                                                value={booking.numOfChildren}
                                                placeholder="0"
                                                min={0}
                                                max={Math.max(0, maxGuests - booking.numOfAdults)}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Select 0 if no children
                                            </Form.Control.Feedback>
                                        </div>
                                    </div>
                                </fieldset>

                                <div className="form-group mt-4 mb-2 text-center">
                                    <button type="submit" className="btn btn-hotel" style={{minWidth: "150px"}}>
                                        Continue
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default BookingForm;
