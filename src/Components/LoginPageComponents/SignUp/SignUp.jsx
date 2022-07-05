import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from "../../../context/UserAuthContext";
import { Link } from 'react-router-dom'

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const { signUp } = useUserAuth();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signUp(email, password);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <>
            <div className="p-4 box">
                <h2 className="mb-3">Signup</h2>
                {error && <h2>{error}</h2>}
                <form name="loginForm" className="loginForm">
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email Address </label>
                        <input
                            type="email"
                            className="form-control email"
                            name="email"
                            placeholder="Email address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Password</label>
                        <div className="pwdMask">
                            {/* <!-- <label for="exampleInputPassword1">Password</label> --> */}
                            <input type="password"
                                className="form-control password"
                                name="password"
                                placeholder="Password"

                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {/* <!-- <span className="fa fa-eye-slash pwd-toggle"></span> --> */}
                        </div>
                    </div>
                    {/* <!-- start remember-row --> */}
                    <div className="row remember-row">
                        <div className="col-xs-6 col-sm-6">
                            <label className="checkbox text-left">
                                <input type="checkbox" value="remember-me" />
                                <span className="label-text">Remember me</span>
                            </label>
                        </div>
                        <div className="col-xs-6 col-sm-6">
                            <p className="forgotPwd">
                                <Link className="lnk-toggler" data-panel=".panel-forgot"
                                    to="#">Forgot password?</Link>
                            </p>
                        </div>
                    </div>
                    {/* <!-- ./remember-row --> */}
                    <div className="form-group">
                        <Link to=""
                            target="_blank"
                            className="btn btn-lg btn-primary btn-block"
                            type="button"
                            onClick={handleSubmit}

                        >SIGN IN</Link>

                        <Link to="/signUp"><p>Create Your New Account</p></Link>
                    </div>
                </form>
            </div>
            <div className="p-4 box mt-3 text-center">
                Already have an account? <Link to="/signIn">Log In</Link>
            </div>
        </>
    )
}

export default SignUp
