import {Link} from "react-router-dom";


const Admin = () => {
    return (
        <section className="container mt-5">
            <h2>Admin Panel</h2>
            <hr/>
            <Link to={"/rooms"}>
                Manage Rooms
            </Link>
            <Link to={"/bookings"}>
                Manage Bookings
            </Link>
        </section>
    );
};

export default Admin;
