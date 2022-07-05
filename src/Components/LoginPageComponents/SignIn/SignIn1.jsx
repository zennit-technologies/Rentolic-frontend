import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { loadUsers } from '../../../Actions/usersAction';
import { useUserAuth } from "../../../context/UserAuthContext";
import Otp from './Otp';

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
        password: ""
    })



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn, googleSignIn } = useUserAuth();
    const { setUpRecaptha } = useUserAuth();
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [user, setUser] = useState({ id: "", fullName: "", login: "", phone: "", token: "" })


    const [sign, setSign] = useState(1);
    const [result, setResult] = useState("");
    const [result2, setResult2] = useState("");
    const [confirm, setConfirm] = useState("");
    const [state, setState] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: ""
    })

    const navigate = useNavigate();

    const getOtp = async (e) => {
        e.preventDefault();
        console.log(data.phone)
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
        console.log(state.phone)
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
        if (!data.phone || data.phone.length < 13 || data.phone.length > 13) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Valid Phone !", });
        }
        else if (!data.password) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Password !", });

        }
        else {

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
                })
        }
    };

    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value })
        console.log(state)
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!state.fullName) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Full Name !", });
        }
        else if (!state.email) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Email Address !", });
        }
        else if (!state.phone || state.phone.length < 13 || state.phone.length > 13) {
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
        else if (confirm !== state.password) {
            setOpen(true);
            setAlert({ sev: "error", content: "Password and Confirm Password is Different !", });
        }
        else {
            let filterUser = users.filter((val) => { return val.phone === state.phone })
            console.log(filterUser.length)
            console.log(users)
            if (filterUser.length !== 0) {
                setOpen(true);
                setAlert({ sev: "error", content: "This Mobile Number is already registered !", });

            }
            else {
                getOtp2(e);
            }
        }
    }

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            const respo = await googleSignIn();
            console.log("respone", respo)
            localStorage.setItem("fullname", respo.user.displayName);
            window.location.reload(false);
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };

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
                                <div className="authfy-container ">

                                    {sign === 1 ? <div className="col-sm-7 line-form">
                                        {/* <!-- authfy-login start --> */}
                                        <div className="authfy-login">
                                            {/* <!-- panel-login start --> */}
                                            <div className="authfy-panel panel-login text-center active">
                                                <div className="authfy-heading">
                                                    <h3 className="auth-title ">SIGN IN</h3>
                                                    {/* <!-- <p>Don’t have an account? <a className="lnk-toggler" data-panel=".panel-signup" to="#">Sign Up Free!</a></p> --> */}
                                                </div>
                                                <div className="row">
                                                    <div className="col-xs-12 col-sm-12">
                                                        <form name="loginForm" className="loginForm">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">Phone Number </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control email"
                                                                    name="phonenum"
                                                                    placeholder="Phone Number"
                                                                    onChange={(e) => setData({ ...data, phone: `+91${e.target.value}` })}
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">Password</label>
                                                                <div className="pwdMask">
                                                                    {/* <!-- <label htmlFor="exampleInputPassword1">Password</label> --> */}
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
                                                                <Stack spacing={2} sx={{ width: '100%' }} id="stack" className="form-group">
                                                                    <button
                                                                        className="btn btn-lg btn-primary"
                                                                        type="button"
                                                                        onClick={handleSubmit}
                                                                    >SIGN IN</button>
                                                                    {/* Snackbar */}
                                                                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1500} onClose={handleClose}>
                                                                        <Alert onClose={handleClose} severity={alert.sev} sx={{ width: '100%' }}>
                                                                            {alert.content}
                                                                        </Alert>
                                                                    </Snackbar>
                                                                </Stack>

                                                                <Link to="#" onClick={() => { setSign(2) }}><p>Create Your New Account</p></Link>
                                                            </div>
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
                                                                <input type="text" className="form-control" name="fullName"
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
                                    </div> : flag2 ? <Otp result={result2} user={state} phone={state.phone} />
                                        :
                                        <div className="col-sm-7 line-form">
                                            {/* <!-- authfy-login start --> */}
                                            <div className="authfy-login">
                                                {/* <!-- panel-login start --> */}
                                                <div className="authfy-panel panel-login text-center active">
                                                    <div className="authfy-heading">
                                                        <h3 className="auth-title ">SIGN UP</h3>
                                                        {/* <!-- <p>Don’t have an account? <a className="lnk-toggler" data-panel=".panel-signup" to="#">Sign Up Free!</a></p> --> */}
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xs-12 col-sm-12">
                                                            <form name="loginForm" className="loginForm">
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
                                                                    <label htmlFor="exampleInputEmail1">Phone Number</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control email"
                                                                        name="phone"
                                                                        placeholder="Phone Number"
                                                                        // value={state.phone}
                                                                        onChange={(e) => setState({ ...state, phone: `+91${e.target.value}` })}
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
                                                                        <div id="recaptcha-container"></div>


                                                                        <div className="form-group">
                                                                            <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                                                                                <button to=""
                                                                                    className="btn btn-lg btn-primary btn-block"
                                                                                    type="button"
                                                                                    onClick={handleRegister}
                                                                                >SIGN IN</button>
                                                                                {/* Snackbar */}
                                                                                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1500} onClose={handleClose}>
                                                                                    <Alert onClose={handleClose} severity={alert.sev} sx={{ width: '100%' }}>
                                                                                        {alert.content}
                                                                                    </Alert>
                                                                                </Snackbar>
                                                                            </Stack>


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
                                    {!flag2 ? <div className="col-sm-5 pt-35 pl-50 ">
                                        <div className="brand-col">
                                            <div className="headline">
                                                {/* <!-- brand-logo start --> */}
                                                <div className="brand-logo">

                                                    <h3 className="brand-title ">SIGN UP</h3>
                                                    {/* <!-- <p>Don’t have an account? <a className="lnk-toggler" data-panel=".panel-signup" to="#">Sign Up Free!</a></p> --> */}

                                                </div>
                                                {/* <!-- ./brand-logo --> */}
                                                {/* <!--  <p>Login using social media to get quick access</p> -->
                                         <!-- social login buttons start --> */}
                                                <div className="row social-buttons">
                                                    <div className="col-xs-4 col-sm-4 col-md-12 pb-2">
                                                        <Link to="#" className="btn btn-block btn-facebook" >
                                                            <i className="fab fa-facebook-f fa-2x" style={{ float: 'left' }}></i> <span
                                                                className="hidden-xs hidden-sm">Login with facebook</span>
                                                            {/* <ul style={{paddingLeft: '1rem'}}></ul> */}
                                                        </Link>
                                                    </div>
                                                    <div className="col-xs-4 col-sm-4 col-md-12 pb-2">
                                                        <Link to="#" className="btn btn-block btn-twitter" >
                                                            <i className="fab fa-twitter fa-2x" style={{ float: 'left' }}></i> <span
                                                                className="hidden-xs hidden-sm">Login with twitter</span>
                                                        </Link>
                                                    </div>
                                                    <div className="col-xs-4 col-sm-4 col-md-12 pb-2" onClick={handleGoogleSignIn}>
                                                        <Link to="#" className="btn btn-block btn-google" >
                                                            <i className="fab fa-google-plus fa-2x" style={{ float: 'left' }}></i> <span
                                                                className="hidden-xs hidden-sm">Login with google</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                                {/* <!-- ./social-buttons --> */}
                                            </div>
                                        </div>
                                    </div> : <div></div>}
                                </div>
                            </div>
                            {/* <!-- ./row --> */}
                        </div>



                    </div>

                        <div id="snell">
                        </div>

                    </>

            }

        </>

    )
}

export default SignIn
