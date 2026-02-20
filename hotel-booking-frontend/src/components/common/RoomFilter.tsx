import React, {useState} from 'react';

type Room = {
    photo: string;
    roomType: string;
    roomPrice: number;
};

type Props = {
    data: Room[];
    setFilteredData: (rooms: Room[]) => void;
};

const RoomFilter = ({data, setFilteredData}: Props) => {
    const [filter, setFilter] = useState("");

    const handleSelectChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedRoomType = e.target.value;
        setFilter(selectedRoomType);

        const filteredRooms = data.filter((room) =>
            room.roomType.toLowerCase()
                .includes(selectedRoomType.toLowerCase()))

        setFilteredData(filteredRooms);
    }

    const clearFilter = () => {
        setFilter("");
        setFilteredData(data);
    }

    const roomTypes = ["", ...new Set(data.map(room => room.roomType))];

    return (
        <div>

        </div>
    );
};

export default RoomFilter;
