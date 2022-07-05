import React, {  useState } from 'react'
// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ForgotPasswordSubmit = ({phone}) => {
    // Snackbar Code
    const [data, setData] = useState({phone:phone,password:''});
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    let navigate=useNavigate();

    // submit password functionality
    const submitPasswordHandler = (e) => {
        e.preventDefault();
        console.log(phone)
        if (!data.password) { setOpen(true); setAlert({ sev: "error", content: "Please Enter Password !", }); }
        else if (data.password.length<8) { setOpen(true); setAlert({ sev: "error", content: "Password should be at least 8 characters!", }); }
        else {
          console.log("data",data)
          axios.post(`${process.env.REACT_APP_IPURL}/api/forgot-password/`,data)
          .then((res)=>{
            setOpen(true); setAlert({ sev: "success", content: res?.data?.data?.message, });
            setTimeout(()=>{
                navigate('/signIn')
            },2000)
          })
          .catch((err)=>{
            setOpen(true); setAlert({ sev: "error", content: err, });
          })

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
            <div className="container">
                <div className="authfy-heading mt-4">
                    <h3 className="auth-title text-center">FORGOT PASSWORD</h3>
                </div>
                <div className="row forgot-row">
                    <div className="col-xs-6 col-sm-12 col-lg-6">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Enter New Password </label>
                            <input
                                type="password"
                                className="form-control email"
                                name="password"
                                placeholder="Enter Your New Password"
                                onChange={(e) => setData({...data,password:e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <Stack spacing={2} sx={{ width: '100%' }} id="stack" className="form-group">
                                <button
                                    className="btn btn-lg btn-primary"
                                    type="button"
                                    onClick={submitPasswordHandler}>SUBMIT</button>
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
        </>
    )
}

export default ForgotPasswordSubmit