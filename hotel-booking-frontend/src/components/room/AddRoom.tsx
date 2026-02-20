import {type ChangeEvent, useState} from 'react'
import {addRoom} from "../utils/ApiFunctions.ts";
import RoomTypeSelector from "../common/RoomTypeSelector.tsx";

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
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Add a New Room</h2>

                        {successMessage && (
                            <div className="alert alert-success fade show" role="alert">
                                {successMessage}
                            </div>
                        )}
                        {errorMessage && (
                            <div className="alert alert-danger fade show" role="alert">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="roomType" className="form-label">
                                    Room Type
                                </label>
                                <div>
                                    <RoomTypeSelector
                                        handleRoomInputChange={handleRoomInputChange}
                                        newRoom={newRoom}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label">
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
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label">
                                    Room Photo
                                </label>
                                <input
                                    className="form-control"
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview Room Photo"
                                        style={{ maxWidth: "400px", maxHeight: "400px" }}
                                        className="mb-3"
                                    />
                                )}
                            </div>
                            <div className="d-grid d-md-flex mt-2">
                                <button className="btn btn-outline-primary ml-5">
                                    Save Room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddRoom
