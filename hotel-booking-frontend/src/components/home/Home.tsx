import MainHeader from "../layout/MainHeader.tsx";
import HotelService from "../common/HotelService.tsx";
import Parallax from "../common/Parallax.tsx";
import RoomCarousel from "../common/RoomCarousel.tsx";
import RoomSearch from "../common/RoomSearch.tsx";

const Home = () => {
    return (
        <section>
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
