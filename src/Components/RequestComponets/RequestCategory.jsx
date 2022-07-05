import { Stack } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { addCategory, loadCategoryes } from '../../Actions/categoryAction';
import './request.css'

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RequestCategory = () => {
    // LOAD ACTIONS
    let dispatch = useDispatch();
    const { categoryes } = useSelector(state => state.categoryData);
    useEffect(() => {
        dispatch(loadCategoryes());
    }, []);

    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    const [state, setState] = useState({
        category_name: "",
        deleted: "1",
    });

    const [error, setError] = useState("");

    const {
        category_name,
    } = state;

    let navigate = useNavigate();
    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    // FILLED ERROR
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category_name) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Content !", });
        }
        else {
            // Green Snackbar
            setOpen(true);
            setAlert({ sev: "success", content: "Request Successfully", });
            setError("");
            dispatch(addCategory(state));
            setError("");
        }
    };

    // Cancel Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        if (alert.sev === 'success') {
            navigate("/all-category");
        }
    };
    return (
        <>
            <section class="paddingtotop">
                <div className="container">
                    <div className="col-lg-12 paddingtobot">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="category-list">
                                    <h1>All Category</h1>
                                    {categoryes &&
                                        categoryes.map((category, i) => {
                                            return (
                                                <div className="category">
                                                    <h5>{category.category_name}</h5>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <form>
                                    
                                    <div className="form-group">
                                        <label for="exampleInputPassword1"><h2>Category Name</h2></label>
                                        <input type="text" className="form-control" name="category_name" placeholder="Category Name" onChange={onChangeHandler} />
                                    </div>

                                    <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                                        {/* Snackbar */}
                                        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1500} onClose={handleClose}>
                                            <Alert onClose={handleClose} severity={alert.sev} sx={{ width: '100%' }}>
                                                {alert.content}
                                            </Alert>
                                        </Snackbar>
                                    </Stack>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RequestCategory