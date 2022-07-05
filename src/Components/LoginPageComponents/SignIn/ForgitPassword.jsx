import React, { useEffect, useState } from 'react'
// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from '../../../Actions/usersAction';
import { useUserAuth } from "../../../context/UserAuthContext";
import ForgotOtp from './ForgotOtp';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ForgitPassword = () => {
    // Snackbar Code
    const [phone, setPhone] = useState('');
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });
    const { setUpRecaptha } = useUserAuth();
    const [result, setResult] = useState("");
    const [flag, setFlag] = useState(false);


    let dispatch = useDispatch();

    const { users } = useSelector(state => state.usersData);
    useEffect(() => {
        dispatch(loadUsers());
    }, []);

    // otp request functionality
    const getOtp = async (e) => {
        e.preventDefault();
        console.log(phone)
        try {
            const response = await setUpRecaptha(phone);
            setResult(response);
            setFlag(true);
        } catch (err) {
            setOpen(true);
            setAlert({ sev: "error", content: err.message, });
        }
    };

    // forgot password functionality
    const forgotPasswordHandler = (e) => {
        e.preventDefault();
        if (!phone) { setOpen(true); setAlert({ sev: "error", content: "Please Enter Phone No.!", }); }
        else if (phone.length < 13 || phone.length > 13) { setOpen(true); setAlert({ sev: "error", content: "Please Enter Valid Phone No.!", }); }
        else {
            let filterUser = users.filter((val) => { return val.phone === phone })
            if (filterUser.length === 0) {
                setOpen(true);
                setAlert({ sev: "error", content: "This Mobile Number is not registered !", });

            }
            else {
                getOtp(e);
            }
        }
    }

    // Cancel Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <>
            {!flag ? <div className="container">
                <div className="authfy-heading mt-4">
                    <h3 className="auth-title text-center">FORGOT PASSWORD</h3>
                </div>
                <div className="row forgot-row">
                    <div className="col-xs-6 col-sm-12 col-lg-6">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Enter Phone </label>
                            <input
                                type="text"
                                className="form-control email"
                                name="phone"
                                placeholder="Enter Your Phone"
                                onChange={(e) => setPhone(`+91${e.target.value}`)}
                            />
                        </div>
                        <div id="recaptcha-container"></div>

                        <div className="form-group">
                            <Stack spacing={2} sx={{ width: '100%' }} id="stack" className="form-group mt-100">
                                <button
                                    className="btn btn-lg btn-primary"
                                    type="button"
                                    onClick={forgotPasswordHandler}>SEND OTP</button>
                                {/* Snackbar */}
                                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1500} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity={alert.sev} sx={{ width: '100%' }}>
                                        {alert.content}
                                    </Alert>
                                </Snackbar>
                            </Stack>
                        </div>
                    </div>
                </div>
            </div> : <ForgotOtp result={result} phone={phone} />}
        </>
    )
}

export default ForgitPassword