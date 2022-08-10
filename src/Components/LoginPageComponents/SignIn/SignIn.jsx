import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { loadUsers } from '../../../Actions/usersAction';
import { useUserAuth } from "../../../context/UserAuthContext";
import Otp from './Otp';
import login from './2803207.jpg'

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const SignIn = () => {

    const { users } = useSelector(state => state.usersData);
    useEffect(() => {
        dispatch(loadUsers());
    }, []);

    let dispatch = useDispatch();
    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    const [data, setData] = useState({
        phone: "",
        password: "",
        // terms: "",
    })



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn, googleSignIn } = useUserAuth();
    const { setUpRecaptha } = useUserAuth();
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [user, setUser] = useState({ id: "", fullName: "", login: "", phone: "", token: "", tnc: false })


    const [sign, setSign] = useState(1);
    const [result, setResult] = useState("");
    const [result2, setResult2] = useState("");
    const [confirm, setConfirm] = useState("");
    const [state, setState] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        tnc: false,
    })

    const {
        tnc,
    } = state;

    const navigate = useNavigate();

    const getOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await setUpRecaptha(data.phone);
            setResult(response);
            setFlag(true);
        } catch (err) {
            setOpen(true);
            setAlert({ sev: "error", content: err.message, });
            setError(err.message);
        }
    };

    const getOtp2 = async (e) => {
        e.preventDefault();
        try {
            const response = await setUpRecaptha(state.phone);
            setResult2(response);
            setFlag2(true);
            setUser({ ...user, id: result2.data.id })
        } catch (err) {
            setOpen(true);
            setAlert({ sev: "error", content: err.message, });
            setError(err.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        const phoneFormat = /^[6-9]\d{9}$/;
        if (!data.phone || !data.phone.toString().match(phoneFormat)) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Valid Phone !", });
        }
        else if (!data.password) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Password !", });
        }
        // else if (!terms) {
        //     setOpen(true);
        //     setAlert({ sev: "error", content: "Please Enter Accept terms and condition !", });
        // }
        else {
            data.phone = `+91${data.phone}`;
            axios.post(`${process.env.REACT_APP_IPURL}/api/admin/login`, data)
                .then((res) => {
                    setUser({ id: res.data.id, fullName: res.data.fullName, login: true, phone: res.data.phone, token: res.data.token });
                    // localStorage.setItem("user", true);
                    // localStorage.setItem("token", res.data.token);
                    // localStorage.setItem("id", res.data.id);
                    getOtp(e);

                })
                .catch((error) => {
                    setOpen(true);
                    setAlert({ sev: "error", content: error.response.data.msg, });
                    data.phone = data.phone.slice(3);
                })
        }
    };

    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const mailFormat = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        const phoneFormat = /^[6-9]\d{9}$/;
        if (!state.fullName) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Full Name !", });
        }
        else if (!state.email || !state.email.match(mailFormat)) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Email Address !", });
        }
        else if (!state.phone || state.phone.length < 10 || state.phone.length > 10 || !state.phone.toString().match(phoneFormat)) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Valid Phone !", });
        }
        else if (!state.password) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Password !", });
        }
        else if (!confirm) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Confirm Password !", });
        }
        else if (!tnc) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Agree to Terms and Conditions", });
        }
        else if (confirm !== state.password) {
            setOpen(true);
            setAlert({ sev: "error", content: "Password Does Not Match !", });
        }
        else {
            state.phone = `+91${state.phone}`;
            let filterUser = users.filter((val) => { return val.phone === state.phone })
            if (filterUser.length !== 0) {
                setOpen(true);
                setAlert({ sev: "error", content: "This Mobile Number is already registered !", });
                state.phone = state.phone.slice(3);
            }
            else {
                getOtp2(e);
            }

        }
    }

    // Cancel Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        // if (alert.sev === 'success') {
        //     navigate("/lender/Request-Category");
        // }
    };

    return (
        <>
            {
                flag ? <Otp result={result} user={user} phone={data.phone} />
                    : <><div className="dust-paarticle bg-white" >
                        <div className="container">
                            <div className="row">
                                {sign === 1 ? <div className="col-lg-6 col-sm-12">
                                    {/* <!-- authfy-login start --> */}
                                    <div className="authfy-login">
                                        {/* <!-- panel-login start --> */}
                                        <div className="authfy-panel panel-login text-center active">
                                            <div className="authfy-heading">
                                                <h3 className="auth-title ">SIGN IN</h3>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-12 col-lg-12">
                                                    <form name="loginForm" className="loginForm">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Phone Number </label>
                                                            <input
                                                                type="number"
                                                                className="form-control email"
                                                                name="phonenum"
                                                                placeholder="Phone Number"
                                                                // value={data.phone}
                                                                onChange={(e) => setData({ ...data, phone: e.target.value })}
                                                                onKeyPress={(e) => { if (e.target.value.length >= 10) e.preventDefault() }}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Password</label>
                                                            <div className="pwdMask">
                                                                <input type="password"
                                                                    className="form-control password"
                                                                    name="password"
                                                                    placeholder="Password"

                                                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                                                />
                                                                <div id="recaptcha-container"></div>
                                                                {/* <!-- <span className="fa fa-eye-slash pwd-toggle"></span> --> */}
                                                            </div>
                                                        </div>
                                                        {/* <!-- start remember-row --> */}
                                                        <div className="row remember-row">
                                                            <div className="col-xs-6 col-sm-6">
                                                                <label className="text-left">
                                                                    <input type="checkbox" />
                                                                    <span className="label-text ml-1">Remember me</span>
                                                                </label>
                                                            </div>
                                                            <div className="col-xs-6 col-sm-6">
                                                                <p className="forgotPwd">
                                                                    <Link className="lnk-toggler" data-panel=".panel-forgot"
                                                                        to="/forgot-password">Forgot password?</Link>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {/* <div className="row remember-row">
                                                            <div className="col-xs-6 col-sm-6">
                                                                <label className="checkbox text-left">
                                                                    <input type="checkbox" value="remember-me" 
                                                                    name="terms" 
                                                                    onChange={(e) => setData({ ...data, terms: e.target.value })}
                                                                    />
                                                                    <span className="label-text">Accept our <a href="" target="_blank">terms and condition</a></span>
                                                                </label>
                                                            </div>
                                                        </div> */}
                                                        {/* <!-- ./remember-row --> */}
                                                        <div className="form-group">

                                                            <button
                                                                className="btn btn-lg btn-primary"
                                                                type="button"
                                                                onClick={handleSubmit}
                                                            >SIGN IN</button>


                                                            <Link to="#" onClick={() => { setSign(2) }}><p>Create Your New Account</p></Link>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* <!-- ./authfy-login --> */}
                                </div> : flag2 ? <Otp result={result2} user={state} phone={state.phone} />
                                    :
                                    <div className="col-lg-6 col-sm-6 col-12">
                                        {/* <!-- authfy-login start --> */}
                                        <div className="authfy-login">
                                            {/* <!-- panel-login start --> */}
                                            <div className="authfy-panel panel-login text-center active">
                                                <div className="authfy-heading">
                                                    <h3 className="auth-title ">SIGN UP</h3>
                                                    {/* <!-- <p>Don’t have an account? <a className="lnk-toggler" data-panel=".panel-signup" to="#">Sign Up Free!</a></p> --> */}
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12 col-xs-12 col-sm-12">
                                                        <form name="loginForm" className="loginForm">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">Phone Number</label>
                                                                <input
                                                                    type="number"
                                                                    className="form-control email"
                                                                    name="phone"
                                                                    placeholder="Phone Number"
                                                                    // value={state.phone}
                                                                    onChange={(e) => setState({ ...state, phone: e.target.value })}
                                                                    onKeyPress={(e) => { if (e.target.value.length >= 10) e.preventDefault() }}

                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">Full Name</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control email"
                                                                    name="fullName"
                                                                    placeholder="Full Name"
                                                                    // value={state.fullName}
                                                                    onChange={onChangeHandler}
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">Email Address</label>
                                                                <input
                                                                    type="email"
                                                                    className="form-control email"
                                                                    name="email"
                                                                    placeholder="Email"
                                                                    // value={state.email}
                                                                    onChange={onChangeHandler}
                                                                />
                                                            </div>

                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">Password</label>
                                                                <input
                                                                    type="password"
                                                                    className="form-control email"
                                                                    name="password"
                                                                    placeholder="Password"
                                                                    // value={state.password}
                                                                    onChange={onChangeHandler}
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">Confirm Password</label>
                                                                <div className="pwdMask">
                                                                    {/* <!-- <label htmlFor="exampleInputPassword1">Password</label> --> */}
                                                                    <input type="password"
                                                                        className="form-control password"
                                                                        name="password"
                                                                        placeholder="Confirm Password"
                                                                        // value={confirm}
                                                                        onChange={(e) => setConfirm(e.target.value)}
                                                                    />
                                                                    {/* <!-- <span className="fa fa-eye-slash pwd-toggle"></span> --> */}
                                                                    <div id="recaptcha-container">
                                                                        <input type="checkbox" name="tnc" onClick={() => setState({ ...state, tnc: !state.tnc })} />
                                                                        &nbsp;Agree to <Link to="/">Terms and Conditions</Link>
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <button to=""
                                                                            className="btn btn-lg btn-primary btn-block"
                                                                            type="button"
                                                                            onClick={handleRegister}
                                                                        >SIGN UP</button>



                                                                        <div className="p-4 box mt-0 text-center">
                                                                            Already have an account? <Link to="#" onClick={() => { setSign(1) }}>Log In</Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <!-- start remember-row --> */}

                                                            {/* <!-- ./remember-row --> */}

                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- ./panel-login --> */}
                                            {/* <!-- panel-signup start --> */}
                                            <div className="authfy-panel panel-signup text-center">
                                                <div className="row">
                                                    <div className="col-xs-12 col-sm-12">
                                                        <div className="authfy-heading">
                                                            <h3 className="auth-title">Sign up for free!</h3>
                                                        </div>
                                                        <form name="signupForm" className="signupForm" action="#" method="POST">
                                                            <div className="form-group">
                                                                <input type="email" className="form-control" name="username"
                                                                    placeholder="Email address" />
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="text" className="form-control" name="fullname"
                                                                    placeholder="Full name" />
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="pwdMask">
                                                                    <input type="password" className="form-control" name="password"
                                                                        placeholder="Password" />
                                                                    <span className="fa fa-eye-slash pwd-toggle"></span>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <p className="term-policy text-muted small">I agree to the <Link
                                                                    to="#">privacy policy</Link> and <Link to="#">terms of
                                                                        service</Link>.</p>
                                                            </div>
                                                            <div className="form-group">
                                                                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign
                                                                    up with email</button>
                                                            </div>
                                                        </form>
                                                        <Link className="lnk-toggler" data-panel=".panel-login" to="#">Already have an
                                                            account?</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- ./panel-signup --> */}
                                            {/* <!-- panel-forget start --> */}
                                            <div className="authfy-panel panel-forgot">
                                                <div className="row">
                                                    <div className="col-xs-12 col-sm-12">
                                                        <div className="authfy-heading">
                                                            <h3 className="auth-title">Recover your password</h3>
                                                            <p>Fill in your e-mail address below and we will send you an email with
                                                                further instructions.</p>
                                                        </div>
                                                        <form name="forgetForm" className="forgetForm" action="#" method="POST">
                                                            <div className="form-group">
                                                                <input type="email" className="form-control" name="username"
                                                                    placeholder="Email address" />
                                                            </div>
                                                            <div className="form-group">
                                                                <button className="btn btn-lg btn-primary btn-block"
                                                                    type="submit">Recover your password</button>
                                                            </div>
                                                            <div className="form-group">
                                                                <Link className="lnk-toggler" data-panel=".panel-login" to="#">Already
                                                                    have an account?</Link>
                                                            </div>
                                                            <div className="form-group">
                                                                <Link className="lnk-toggler" data-panel=".panel-signup" to="#">Don’t
                                                                    have an account?</Link>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- ./panel-forgot --> */}
                                        </div>
                                        {/* <!-- ./authfy-login --> */}
                                    </div>
                                }
                                <div className="col-lg-6 col-sm-12 image-center hide-img-in-mobile">
                                    <figure>
                                        <img src={login} alt="Welcome User" className='img-fluid' />
                                    </figure>
                                </div>
                            </div>
                        </div>

                        <Stack spacing={2} sx={{ width: '100%' }} id="stack" className="form-group">
                            {/* Snackbar */}
                            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1500} onClose={handleClose}>
                                <Alert onClose={handleClose} severity={alert.sev} sx={{ width: '100%' }}>
                                    {alert.content}
                                </Alert>
                            </Snackbar>
                        </Stack>
                        {/* <!-- ./row --> */}
                    </div>
                    </>

            }

        </>

    )
}

export default SignIn
