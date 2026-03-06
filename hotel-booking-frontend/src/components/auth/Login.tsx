import {type ChangeEvent, useContext, useState} from "react";
import {loginUser} from "../../services/AuthService.ts";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.ts";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [login, setLogin] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const { handleLogin } = useContext(AuthContext);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setLogin({...login, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (
        e: ChangeEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const success = await loginUser(login);

        if (success) {
            const token = success.token;
            handleLogin(token);

            navigate("/");
        } else {
            setErrorMessage("Invalid username or password. Please try again.");
        }
        setTimeout(() => {
            setErrorMessage("");
        }, 3000);
    }

    return (
        <section className="container mt-4 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}

                    <div className="card border-0 shadow-sm auth-card">
                        <div className="card-body p-4 p-md-5">
                            <h2 className="hotel-color mb-1 text-center">Login</h2>
                            <p className="text-muted mb-4 text-center">Welcome back to LuxeStay</p>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label hotel-color fw-semibold">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        value={login.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label hotel-color fw-semibold">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        value={login.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mt-4 text-center">
                                    <button type="submit" className="btn btn-hotel px-4">
                                        Login
                                    </button>
                                    <p className="auth-switch-text mb-0 mt-3">
                                        Don&apos;t have an account yet? <Link to={"/register"}>Register</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
