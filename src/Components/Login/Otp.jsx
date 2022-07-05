import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { addUser } from '../../../Actions/usersAction';
import { useDispatch } from 'react-redux';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Otp = ({ result, user, phone }) => {
    let lastThree = phone.substr(phone.length - 3);
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [error, setError] = useState("");
    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    const navigate = useNavigate();
    let dispatch = useDispatch();



    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };
    const complete = otp.join("");

    const verifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        if (complete === "" || complete === null || complete.length > 6) return setError("Please Enter Correct OTP");
        try {
            await result.confirm(complete);
            console.log("done")


            if (user.id === undefined) {
                console.log('register done',user)
                dispatch(addUser(user));
                setOpen(true);
                setAlert({ sev: "success", content: 'Registered Successfully' });
                navigate("/signIn");
                setTimeout(()=>{
                    window.location.reload(false);
                },3000)

            }
            else if (user.id !== undefined) {
                console.log('login done')

                localStorage.setItem("user", true);
                localStorage.setItem("id", user.id);
                localStorage.setItem("fullname", user.fullName);
                localStorage.setItem("token", user.token);
                localStorage.setItem("phone", user.phone);
                navigate("/");
                window.location.reload(false);
            }
        } catch (err) {
            setOpen(true);
            setAlert({ sev: "error", content: err.message, });
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
        <div>
            <div className="row otp-container">
                <div className="col text-center">
                    <h1>Please Enter The One-Time Password to verify your account</h1>
                    <h5>{`A One-Time Password has been sent to +91-XXXX-XXX-${lastThree}`}</h5>

                    {otp.map((data, index) => {
                        return (
                            <input
                                className="otp-field"
                                type="text"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onFocus={e => e.target.select()}
                            />
                        );
                    })}

                    <p>OTP Entered - {otp.join("")}</p>
                    <div className="otpButton">
                        <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                            <button
                                className="btn btn-secondary mr-2"
                                onClick={e => setOtp([...otp.map(v => "")])}
                            >
                                Clear
                            </button>
                            <button
                                className="btn btn-secondary verify-btn"
                                onClick={verifyOtp}
                            >
                                Verify OTP
                            </button>
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
        </div>
    )
}

export default Otp
