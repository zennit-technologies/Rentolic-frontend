import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { addSubCategory, loadSubCategoryes } from '../../Actions/SubCategoryAction';
import './request.css'

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Stack } from '@mui/material';
import { loadCategoryes } from '../../Actions/categoryAction';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RequestSubCategory = () => {

    const { categoryes } = useSelector(state => state.categoryData);
    useEffect(() => {
        dispatch(loadCategoryes());
    }, []);

    // LOAD ACTIONS
    let dispatch = useDispatch();
    const { subCategoryes } = useSelector(state => state.subCategoryData);
    useEffect(() => {
        dispatch(loadSubCategoryes());
    }, []);

    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    const [state, setState] = useState({
        name: "",
        category_id: "",
        verification_required: "1",
        status: "0",
    });
    console.log(state)

    const [error, setError] = useState("");

    const {
        name,
        category_id,
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
            setAlert({ sev: "error", content: "Please Fill Name !", });
        }
        else if (!category_id) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Category !", });
        }
        else {
            // Green Snackbar
            setOpen(true);
            setAlert({ sev: "success", content: "Request Successfully", });
            setError("");
            dispatch(addSubCategory(state));
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
                                    <h1>All Sub Category</h1>
                                    {subCategoryes &&
                                        subCategoryes.map((subCategorye, i) => {
                                            return (
                                                <div className="category">
                                                    <h5>{subCategorye.name}</h5>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <form>

                                    <div className="form-group">
                                        <label >Select Category <span className='red'>*</span></label>
                                        <select name="category_id" id="" className="form-control " onChange={onChangeHandler}>
                                            <option value="">Select Category</option>
                                            {categoryes &&
                                                categoryes.map((counts) => {
                                                    return (
                                                        <option
                                                            value={counts.id}
                                                        >
                                                            {counts.category_name}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label for="exampleInputPassword1">Sub Category Name <span className='red'>*</span></label>
                                        <input type="text" className="form-control" id="" name='name' placeholder="Sub Category Name" onChange={onChangeHandler} />
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

export default RequestSubCategory