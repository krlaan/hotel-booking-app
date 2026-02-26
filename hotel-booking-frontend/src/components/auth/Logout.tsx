import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Link, useNavigate } from "react-router-dom"

const Logout = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.handleLogout()
        navigate("/", { state: { message: " You have been logged out!" } })
    }

    return (
        <>
            <Link className="dropdown-item" to={"/profile"}>
                Profile
            </Link>
            <hr className="dropdown-divider" />
            <button className="dropdown-item" onClick={handleLogout}>
                Logout
            </button>
        </>
    )
}

export default Logout
