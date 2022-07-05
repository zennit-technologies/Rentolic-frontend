import React, { useEffect, useState } from 'react'
// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addContactus } from '../../Actions/contactUsAction';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ContectUsdd = () => {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });
    const dispatch = useDispatch()
    const [state, setState] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const {
        name,
        email,
        phone,
        subject,
        message,
    } = state;

    let navigate = useNavigate();
    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    // FILLED ERROR
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill name !", });
        }

        else if (!email) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Email !", });
        }
        else if (!phone) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill City !", });
        }
        else if (!subject) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Password !", });
        }
        else if (!message) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Phone !", });
        }

        else {
            // Green Snackbar
            setOpen(true);
            setAlert({ sev: "success", content: "Submit Successfully", });
            dispatch(addContactus(state));
        }
    };

    // Cancel Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        if (alert.sev === 'success') {
            navigate("/");
        }
    };
    return (
        <>
            <section className='paddingtotop'>
                <div className="container">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-lg-12 paddingtobot">
                                <div className="contect">
                                    <div class="contact-section">
                                        <div class="inner-width">
                                            <h1>Get in touch with us</h1>
                                            <input type="text" class="name" name="name" placeholder="Your Name" onChange={onChangeHandler} />
                                            <input type="email" class="email" name="email" placeholder="Your Email" onChange={onChangeHandler} />
                                            <input type="phone" class="name" name="phone" placeholder="Your Phone" onChange={onChangeHandler} />
                                            <input type="text" class="email" name="subject" placeholder="Subject" onChange={onChangeHandler} />
                                            <textarea rows="5" placeholder="Message" class="message" name="message" onChange={onChangeHandler}></textarea>

                                            <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                                                <button onClick={handleSubmit}>Get in touch</button>
                                                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1500} onClose={handleClose}>
                                                    <Alert onClose={handleClose} severity={alert.sev} sx={{ width: '100%' }}>
                                                        {alert.content}
                                                    </Alert>
                                                </Snackbar>
                                            </Stack>

                                        </div>
                                    </div>
                                    <div class="first">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContectUsdd