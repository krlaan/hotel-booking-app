import {useContext} from "react";
import {AuthContext} from "./AuthProvider.tsx";
import {Link, useNavigate} from "react-router-dom";

const Logout = () => {
    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        auth.handleLogout();

        window.location.reload();
        navigate("/", {state: {message: "You have been logged out!"}});
    }

    const isLogged = auth.user !== null;

    return isLogged ? (
        <>
            <li>
                <Link className="dropdown-item" to={"/profile"}>
                    Profile
                </Link>
            </li>
            <li>
                <hr className="dropdown-divider" />
            </li>
            <button onClick={handleLogout} className="dropdown-item">
                Logout
            </button>
        </>
    ): null;
};

export default Logout;
