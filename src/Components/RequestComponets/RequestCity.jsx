import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCity, loadCitys } from '../../Actions/cityAction';
import { Stack } from '@mui/material';
import './request.css'
import { Link, useNavigate } from 'react-router-dom'

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { loadStates } from '../../Actions/statesAction';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const RequestCity = () => {
    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    // LOAD ACTIONS
    let dispatch = useDispatch();
    const { citys } = useSelector(state => state.cityData);
    useEffect(() => {
        dispatch(loadCitys());
    }, []);

    // LOAD ACTIONS
    const { states } = useSelector(state => state.statesData);
    useEffect(() => {
        dispatch(loadStates());
    }, []);

    const [state, setState] = useState({
        city_name: "",
        state_name: "",
        pending_status: "0",
        status: "0",
        is_featured: "0",
    });

    const [error, setError] = useState("");

    const {
        city_name,
        state_name,
    } = state;

    let navigate = useNavigate();
    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    // FILLED ERROR
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!city_name) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill City Name !", });
        }
        else if (!state_name) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please select State !", });
        }
        else {
            // Green Snackbar
            setOpen(true);
            setAlert({ sev: "success", content: "Request Successfully", });
            setError("");
            dispatch(addCity(state));
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
                                    <h1>All City</h1>
                                    {citys &&
                                        citys.map((city, i) => {
                                            return (
                                                <div className="category">
                                                    <h5>{city.city_name}</h5>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <form>
                                <div className="form-group">
                                        <label >Select State <span className='red'>*</span></label>
                                        <select name="state_name" id="" className="form-control " onChange={onChangeHandler}>
                                            <option value="">Select State</option>
                                            {states &&
                                                states.map((counts) => {
                                                    return (
                                                        <option
                                                            value={counts.state_name}
                                                        >
                                                            {counts.state_name}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputPassword1"><h2>City Name</h2></label>
                                        <input type="text" className="form-control" name="city_name" placeholder="City Name" onChange={onChangeHandler} />
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

export default RequestCity