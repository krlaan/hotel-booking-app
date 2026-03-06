import {useEffect, useState} from "react"
import {deleteUser, getUser} from "../../services/UserService.ts";
import {getBookingsByUserId} from "../../services/BookingService.ts";
import {useNavigate} from "react-router-dom"
import moment from "moment"
import { getStorageUserId, clearStorageAuthData } from "../../utils/storageUtils";

const Profile = () => {
    const [user, setUser] = useState({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        roles: [{id: "", name: ""}]
    })

    const [bookings, setBookings] = useState([
        {
            id: "",
            room: {id: "", roomType: ""},
            checkInDate: "",
            checkOutDate: "",
            bookingConfirmationCode: ""
        }
    ])
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const userId = getStorageUserId()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (userId) {
                    const userData = await getUser(userId)
                    setUser(userData)
                }
            } catch (error) {
                console.error(error)
            }
        }

        void fetchUser()
    }, [userId])

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                if (userId) {
                    const response = await getBookingsByUserId(userId)
                    setBookings(response)
                }

            } catch (error: unknown) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("An unexpected error occurred");
                }
            }
        }

        void fetchBookings()
    }, [userId])

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        )
        if (confirmed) {
            if (userId) {
                await deleteUser(userId)
                    .then((response: { data: string }) => {
                        setMessage(response.data)

                        clearStorageAuthData()

                        navigate("/")
                        window.location.reload()
                    })
                    .catch((error: unknown) => {
                        if (error instanceof Error) {
                            setErrorMessage(error.message);
                        } else {
                            setErrorMessage("An unexpected error occurred");
                        }
                    })
            }
        }
    }

    return (
        <>
            <div className="container col-md-8 col-lg-6">
                {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
                {message && <p className="alert alert-info mt-5">{message}</p>}
            </div>

            {user.id ? (
                <section className="mt-5 mb-5 container">
                    <div className="text-center mb-4">
                        <h2 className="hotel-color">My Profile</h2>
                        <p className="text-muted">Manage your account details and booking history</p>
                    </div>

                    <div className="card mb-4 shadow-sm border-0" style={{backgroundColor: '#f8f9fa'}}>
                        <div className="card-body p-4">
                            <div className="row g-4 align-items-center">
                                <div className="col-md-3 text-center">
                                    <img
                                        src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
                                        alt="Profile"
                                        className="rounded-circle profile-avatar"
                                    />
                                </div>

                                <div className="col-md-9">
                                    <div className="profile-info-row row">
                                        <label className="col-md-3 fw-semibold text-muted">ID:</label>
                                        <div className="col-md-9">
                                            <p className="mb-0">{user.id}</p>
                                        </div>
                                    </div>
                                    <hr />

                                    <div className="profile-info-row row">
                                        <label className="col-md-3 fw-semibold text-muted">First Name:</label>
                                        <div className="col-md-9">
                                            <p className="mb-0">{user.firstName}</p>
                                        </div>
                                    </div>
                                    <hr />

                                    <div className="profile-info-row row">
                                        <label className="col-md-3 fw-semibold text-muted">Last Name:</label>
                                        <div className="col-md-9">
                                            <p className="mb-0">{user.lastName}</p>
                                        </div>
                                    </div>
                                    <hr />

                                    <div className="profile-info-row row">
                                        <label className="col-md-3 fw-semibold text-muted">Email:</label>
                                        <div className="col-md-9">
                                            <p className="mb-0">{user.email}</p>
                                        </div>
                                    </div>
                                    <hr />

                                    <div className="profile-info-row row align-items-center">
                                        <label className="col-md-3 fw-semibold text-muted">Roles:</label>
                                        <div className="col-md-9 d-flex flex-wrap gap-2">
                                            {user.roles.map((role) => (
                                                <span key={role.id} className="badge bg-light text-dark border">
                                                    {role.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h5 className="fw-bold text-center hotel-color">Booking History</h5>

                    {bookings.length > 0 ? (
                        <div className="card shadow-sm border-0">
                            <div className="card-body p-0">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col">Booking ID</th>
                                            <th scope="col">Room ID</th>
                                            <th scope="col">Room Type</th>
                                            <th scope="col">Check In Date</th>
                                            <th scope="col">Check Out Date</th>
                                            <th scope="col">Confirmation Code</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking, index) => (
                                            <tr key={index}>
                                                <td>{booking.id}</td>
                                                <td>{booking.room.id}</td>
                                                <td>{booking.room.roomType}</td>
                                                <td>
                                                    {moment(booking.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                                                </td>
                                                <td>
                                                    {moment(booking.checkOutDate)
                                                        .subtract(1, "month")
                                                        .format("MMM Do, YYYY")}
                                                </td>
                                                <td>{booking.bookingConfirmationCode}</td>
                                                <td className="text-success fw-semibold">On-going</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-muted mb-4">You have not made any bookings yet.</p>
                    )}

                    <div className="d-flex justify-content-center mt-4">
                        <button className="btn btn-outline-danger px-4" onClick={handleDeleteAccount}>
                            Close account
                        </button>
                    </div>
                </section>
            ) : (
                <p className="text-center text-muted mt-5">Loading user data...</p>
            )}
        </>
    )
}

export default Profile
