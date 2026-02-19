import {type ChangeEvent, useState} from 'react'
import {addRoom} from "../utils/ApiFunctions.tsx";

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: "",
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRoomInputChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const name = e.target.name;
        let value: string | number = event.target.value;

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
    }

    return (
        <div>
            AddRoom
        </div>
    )
}

export default AddRoom
