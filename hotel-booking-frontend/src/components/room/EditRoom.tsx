import {type ChangeEvent, useEffect, useState} from "react";
import {getRoomById, updateRoom} from "../../services/RoomService.ts";
import {Link, useParams} from "react-router-dom";

type EditRoomData = {
    photo: File | null;
    roomType: string;
    roomPrice: string;
}

const EditRoom = () => {
    const [room, setRoom] = useState<EditRoomData>({
        photo: null,
        roomType: "",
        roomPrice: "",
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const {roomId} = useParams();

    const roomImageSrc = imagePreview.startsWith("blob:") ||
        imagePreview.startsWith("data:") ||
        imagePreview.startsWith("http")
        ? imagePreview
        : `data:image/jpeg;base64,${imagePreview}`;

    const handleImageChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const selectedImage = e.target.files[0];
        setRoom({...room, photo: selectedImage});
        setImagePreview(URL.createObjectURL(selectedImage));
    }

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target
        setRoom({ ...room, [name]: value })
    }

    useEffect(() => {
        const fetchRoom = async () => {
            if (!roomId) {
                setErrorMessage("Room ID not found");
                return;
            }
            try {
                const roomData = await getRoomById(roomId)
                setRoom(roomData)
                setImagePreview(roomData.photo)
            } catch (error) {
                console.error(error)
            }
        }

        void fetchRoom()
    }, [roomId])

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!roomId) {
            setErrorMessage("Room ID not found");
            return;
        }

        try {
            const success = await updateRoom(roomId, room.photo, room.roomType, room.roomPrice)
            if (success) {
                setSuccessMessage("Room updated successfully!")
                const updatedRoomData = await getRoomById(roomId)
                setRoom(updatedRoomData)
                setImagePreview(updatedRoomData.photo)
                setErrorMessage("")
            } else {
                setErrorMessage("Error updating room")
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
        <section className="container mt-5">
            <div className="text-center">
                <h3 className="hotel-color">Edit Room</h3>
                <p className="text-muted">Update room details and keep your listing fresh</p>
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
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="roomType"
                                            name="roomType"
                                            value={room.roomType}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="roomPrice" className="form-label hotel-color fw-semibold">
                                            Room Price
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="roomPrice"
                                            name="roomPrice"
                                            value={room.roomPrice}
                                            onChange={handleInputChange}
                                            min="1"
                                            step="0.01"
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="photo" className="form-label hotel-color fw-semibold">
                                            Update Photo (optional)
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="photo"
                                            name="photo"
                                            onChange={handleImageChange}
                                        />

                                        <div className="mt-3">
                                            {imagePreview ? (
                                                <img
                                                    src={roomImageSrc}
                                                    alt="Room preview"
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
                                    <button type="submit" className="btn btn-hotel">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default EditRoom;
