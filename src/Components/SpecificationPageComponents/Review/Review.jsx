import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {addReview} from '../../../Actions/reviewAction'


// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { Rating } from '@mui/material';
import { useDispatch } from 'react-redux';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Review = ({product}) => {
    const [state, setState] = useState({ product_id:"",user_id:"",rating: "", review: "", name: "", email: "" }); 
    let dispatch = useDispatch();
    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setState({ ...state,user_id:localStorage.getItem('id'),product_id:product, [name]: value });
        console.log(state)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
       
        if (!state.rating) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Rating Star !", });
        }
        else if (!state.review) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Review !", });
        }
        else if (!state.name) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Name !", });
        }
        else if (!state.email) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Email Address !", });
        }
        else if (localStorage.getItem('fullname') === null) {

            setOpen(true);
            setAlert({ sev: "error", content: "Please Login !", });
        }

        else {  
            dispatch(addReview(state))
            setOpen(true);
            setAlert({ sev: "success", content: "Review Submitted!", });
            setState({ product_id:"",user_id:"",rating: "", review: "", name: "", email: "" })
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
        <div className="container">
            <div className="row mt-60">


                <div className="col-xl-7">
                    <div className="review-box">
                        <h3>Add a Review</h3>
                        <div className="rating mb-40 d-flex mt-3">
                            <span>Your Rating:</span>
                            <Rating
                                name="rating"
                                value={state.rating}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <form className="review-form">
                            <div className="row">
                                <div className="col-xl-12">
                                    <label for="message">YOUR REVIEW</label>
                                    <textarea name="review" id="message" cols="30" rows="10" onChange={onChangeHandler}></textarea>
                                </div>
                                <div className="col-xl-6">
                                    <label for="r-name">Name</label>
                                    <input type="text" id="r-name" name="name" value={state.name} onChange={onChangeHandler} />
                                </div>
                                <div className="col-xl-6">
                                    <label for="r-email">Email</label>
                                    <input type="email" id="r-email" name="email" value={state.email} onChange={onChangeHandler} />
                                </div>
                                <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                                    <div className="col-xl-12">
                                        <button className="btn brand-btn" onClick={handleSubmit}>Add your Review</button>
                                    </div>
                                    {/* Snackbar */}
                                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1500} onClose={handleClose}>
                                        <Alert onClose={handleClose} severity={alert.sev} sx={{ width: '100%' }}>
                                            {alert.content}
                                        </Alert>
                                    </Snackbar>
                                </Stack>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Review
