import {type ChangeEvent, useState} from 'react'
import {addRoom} from "../../services/RoomService.ts";
import RoomTypeSelector from "../shared/RoomTypeSelector.tsx";
import {Link} from "react-router-dom";

type NewRoom = {
    photo: File | null;
    roomType: string;
    roomPrice: string;
}

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState<NewRoom>({
        photo: null,
        roomType: "",
        roomPrice: "",
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRoomInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const name = e.target.name;
        let value: string | number = e.target.value;

        if (name === "roomPrice") {
            const num = parseInt(value)
            value = isNaN(num) ? "" : num
        }

        // Update specific field in newRoom state without modifying other fields
        setNewRoom({...newRoom, [name]: value,});
    }

    const handleImageChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const selectedImage = e.target.files[0];
        setNewRoom({...newRoom, photo: selectedImage});
        setImagePreview(URL.createObjectURL(selectedImage));
    }

    const handleSubmit = async (
        e: ChangeEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

        try {
            if (!newRoom.photo || !newRoom.roomType || newRoom.roomPrice === "") {
                setErrorMessage("Please fill all fields");
                return;
            }

            const priceNum = parseFloat(newRoom.roomPrice);
            if (priceNum <= 0) {
                setErrorMessage("Room price must be a positive number!");
                return;
            }

            const success = await addRoom(
                newRoom.photo,
                newRoom.roomType,
                newRoom.roomPrice
            )

            if (success !== undefined) {
                setSuccessMessage("A new room was added to the database");
                setNewRoom({photo: null, roomType: "", roomPrice: ""});
                setImagePreview("");
                setErrorMessage("");
            } else {
                setErrorMessage("Error adding a room to the database");
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unexpected error occurred");
            }
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    }

    return (
        <section className="container mt-5 mb-5">
            <div className="text-center">
                <h3 className="hotel-color">Add New Room</h3>
                <p className="text-muted">Create room details and upload a photo</p>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                    {successMessage && (
                        <div className="alert alert-success" role="alert">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    <div className="card border-0 shadow-sm edit-room-card">
                        <div className="card-body p-4 p-md-5">
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="roomType" className="form-label hotel-color fw-semibold">
                                            Room Type
                                        </label>
                                        <RoomTypeSelector
                                            handleRoomInputChange={handleRoomInputChange}
                                            newRoom={newRoom}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="roomPrice" className="form-label hotel-color fw-semibold">
                                            Room Price
                                        </label>
                                        <input
                                            className="form-control"
                                            required
                                            id="roomPrice"
                                            type="number"
                                            name="roomPrice"
                                            value={newRoom.roomPrice}
                                            onChange={handleRoomInputChange}
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="photo" className="form-label hotel-color fw-semibold">
                                            Room Photo
                                        </label>
                                        <input
                                            className="form-control"
                                            id="photo"
                                            name="photo"
                                            type="file"
                                            onChange={handleImageChange}
                                        />

                                        <div className="mt-3">
                                            {imagePreview ? (
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview Room Photo"
                                                    className="edit-room-preview-image"
                                                />
                                            ) : (
                                                <p className="text-muted mb-0">No preview available</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex flex-wrap gap-2 justify-content-center mt-4 edit-room-actions">
                                    <Link to={"/rooms"} className="btn btn-outline-secondary">
                                        Back to Rooms
                                    </Link>
                                    <button className="btn btn-hotel" type="submit">
                                        Save Room
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddRoom
