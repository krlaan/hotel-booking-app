import MainHeader from "../layout/MainHeader.tsx";
import HotelService from "../common/HotelService.tsx";
import Parallax from "../common/Parallax.tsx";
import RoomCarousel from "../common/RoomCarousel.tsx";
import RoomSearch from "../common/RoomSearch.tsx";
import {useLocation} from "react-router-dom";

const Home = () => {
    const location = useLocation();
    const message = location.state && location.state.message;

    const currentUser = localStorage.getItem("userId");

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
