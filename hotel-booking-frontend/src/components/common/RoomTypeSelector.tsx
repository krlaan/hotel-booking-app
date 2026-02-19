import React, {type ChangeEvent, useEffect, useState} from 'react';
import {getRoomTypes} from "../utils/ApiFunctions.tsx";

type Props = {
    newRoom: { roomType: string };
    handleRoomInputChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const RoomTypeSelector = ({handleRoomInputChange, newRoom}: Props) => {
    const [roomTypes, setRoomTypes] = useState([""]);
    const [showRoomTypeInput, setShowRoomTypeInput] = useState(false);
    const [newRoomType, setNewRoomType] = useState('');

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data);
        })
    }, [])

    const handleNewRoomTypeInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = () => {
        if (newRoomType !== '') {
            setRoomTypes(prev => [...prev, newRoomType]);
            setNewRoomType('');
            setShowRoomTypeInput(false);
        }
    }

    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                    <select
                        className="form-select mb-3"
                        id="roomType"
                        name="roomType"
                        value={newRoom.roomType}
                        onChange={(e) => {
                            if (e.target.value === "Add New") {
                                setShowRoomTypeInput(true);
                            } else {
                                handleRoomInputChange(e);
                            }
                        }}
                    >
                        <option value={""}>
                            Select a room type
                        </option>
                        <option value={"Add New"}>
                            Add New
                        </option>
                        {roomTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {showRoomTypeInput && (
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter a new room type"
                                onChange={handleNewRoomTypeInputChange}
                            />
                            <button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>
                                Add
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default RoomTypeSelector;
