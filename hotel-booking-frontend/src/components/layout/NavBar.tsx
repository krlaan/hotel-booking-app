import {useState, useContext} from "react"
import {NavLink, Link} from "react-router-dom"
import Logout from "../auth/Logout.tsx";
import { AuthContext } from "../../context/AuthContext.ts";

// Previous storage helpers are no longer needed here, context drives updates.

const NavBar = () => {
    const [showAccount, setShowAccount] = useState(false)

    const handleAccountClick = () => {
        setShowAccount(!showAccount)
    }

    const closeAccountMenu = () => {
        setShowAccount(false)
    }

    const { user } = useContext(AuthContext);
    const isLoggedIn = !!user;
    const userId = user?.sub;
    const isAdmin = user?.roles?.includes("ROLE_ADMIN");

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow fixed-top">
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand">
                    <span className="hotel-color">LuxeStay Hotel</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"}>
                                Rooms & Suites
                            </NavLink>
                        </li>

                        {isLoggedIn && isAdmin && (
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                                    Admin
                                </NavLink>
                            </li>
                        )}
                    </ul>

                    <ul className="d-flex navbar-nav">
                        {isLoggedIn && userId && (
                            <li className="nav-item d-flex align-items-center me-3">
                                <span className="navbar-text">Logged in as {userId}</span>
                            </li>
                        )}
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/find-booking"}>
                                Find my booking
                            </NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={handleAccountClick}>
                                {" "}
                                Account
                            </a>

                            <ul
                                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                                aria-labelledby="navbarDropdown">
                                {isLoggedIn ? (
                                    <Logout onComplete={closeAccountMenu} />
                                ) : (
                                    <li>
                                        <Link className="dropdown-item" to={"/login"} onClick={closeAccountMenu}>
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
