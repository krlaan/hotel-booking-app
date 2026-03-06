import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext.ts"
import { Link, useNavigate } from "react-router-dom"

type LogoutProps = {
    onComplete?: () => void;
};

const Logout = ({ onComplete }: LogoutProps) => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.handleLogout()
        navigate("/")
        if (onComplete) {
            onComplete()
        }
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
