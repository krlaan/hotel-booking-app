import MainHeader from "../layout/MainHeader.tsx";
import HotelService from "../shared/HotelService.tsx";
import Parallax from "../shared/Parallax.tsx";
import RoomCarousel from "../shared/RoomCarousel.tsx";
import RoomSearch from "../shared/RoomSearch.tsx";
import {useLocation} from "react-router-dom";

const Home = () => {
    const location = useLocation();
    const message = location.state && location.state.message;

    return (
        <section>
            {message && <p className="text-warning px-5">{message}</p>}
            <MainHeader />

            <section className="container">
                <RoomSearch />
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
