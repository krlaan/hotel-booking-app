import {type ChangeEvent, useState} from "react";
import {loginUser} from "../utils/ApiFunctions.ts";
import {Link, useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [login, setLogin] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setLogin({...login, [e.target.name]: e.target.value});
    }

    const handleLogin = async (
        e: ChangeEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const success = await loginUser(login);

        if (success) {
            const token = success.token;

            const decodeToken = jwtDecode(token);

            localStorage.setItem("token", token);
            localStorage.setItem("userId", decodeToken.sub);
            localStorage.setItem("userRole", decodeToken.roles.join(","));

            navigate("/");
            window.location.reload();
        } else {
            setErrorMessage("Invalid username or password. Please try again.");
        }
        setTimeout(() => {
            setErrorMessage("");
        }, 3000);
    }

    return (
        <section className="container col-6 mt-5 mb-5">
            {errorMessage && <p className="alert alert-danger"> {errorMessage} </p>}

            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="row mb-3">
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                        Email
                    </label>
                    <div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control"
                            value={login.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="password" className="col-sm-2 col-form-label">
                        Password
                    </label>
                    <div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-control"
                            value={login.password}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <button
                        type="submit"
                        className="btn btn-hotel"
                        style={{ marginRight: "10px" }}
                    >
                        Login
                    </button>
                    <span style={{ marginLeft: "10px" }}>
                        Don't have an account yet?'<Link to={"/register"}></Link>
                    </span>
                </div>
            </form>
        </section>
    );
};

export default Login;
