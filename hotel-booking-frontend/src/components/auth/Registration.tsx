import {type ChangeEvent, useState} from "react";
import {registerUser} from "../../services/AuthService.ts";
import {Link} from "react-router-dom";

const Registration = () => {
    const [registration, setRegistration] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setRegistration({...registration, [e.target.name]: e.target.value })
    }

    const handleRegistration = async (
        e: ChangeEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            const result = await registerUser(registration);

            setSuccessMessage(result.message);
            setErrorMessage("");

            setRegistration({firstName: '', lastName: '', email: '', password: ''})

        } catch {
            setSuccessMessage("");
            setErrorMessage(`Registration error!`);
        }
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 4000)
    }

    return (
        <section className="container mt-4 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
                    {successMessage && <p className="alert alert-success">{successMessage}</p>}

                    <div className="card border-0 shadow-sm auth-card">
                        <div className="card-body p-4 p-md-5">
                            <h2 className="hotel-color mb-1 text-center">Register</h2>
                            <p className="text-muted mb-4 text-center">Create your account to continue booking</p>

                            <form onSubmit={handleRegistration}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="firstName" className="form-label hotel-color fw-semibold">
                                            First Name
                                        </label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            className="form-control"
                                            value={registration.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="lastName" className="form-label hotel-color fw-semibold">
                                            Last Name
                                        </label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            className="form-control"
                                            value={registration.lastName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label hotel-color fw-semibold">
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="form-control"
                                            value={registration.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="password" className="form-label hotel-color fw-semibold">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={registration.password}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 text-center">
                                    <button type="submit" className="btn btn-hotel px-4">
                                        Register
                                    </button>
                                    <p className="auth-switch-text mb-0 mt-3">
                                        Already have an account? <Link to={"/login"}>Login</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Registration;
