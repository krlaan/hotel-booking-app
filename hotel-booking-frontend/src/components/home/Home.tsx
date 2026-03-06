import MainHeader from "../layout/MainHeader.tsx";
import HotelService from "../shared/HotelService.tsx";
import Parallax from "../shared/Parallax.tsx";
import RoomCarousel from "../shared/RoomCarousel.tsx";
import RoomSearch from "../shared/RoomSearch.tsx";
import {useLocation} from "react-router-dom";
import { getStorageUserId } from "../../utils/storageUtils";

const Home = () => {
    const location = useLocation();
    const message = location.state && location.state.message;

    const currentUser = getStorageUserId();

    return (
        <section>
            {message && <p className="text-warning px-5">{message}</p>}
            {currentUser && <h6 className="text-success text-center">You are logged-in as {currentUser}</h6>}
            <MainHeader />

            <section className="container">
                <RoomSearch />
                <RoomCarousel />
                <Parallax />
                <RoomCarousel />
                <HotelService />
                <Parallax />
                <RoomCarousel />
            </section>
        </section>
    );
};

export default Home;
