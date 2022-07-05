import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { deleteProduct, loadProducts } from '../../Actions/productAction';

// MUI Import
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { getSingleUser, updateUser } from '../../Actions/usersAction';

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProfileEdit = () => {

    const [state, setState] = useState();
    const [passwordChange, setPasswordChange] = useState({ current: "", newpassword: "", confirm: "" });
    // This code is used for file upload
    const [file, setFile] = useState();
    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });
    const { products } = useSelector(state => state.productData);
    const { user } = useSelector(state => state.usersData);

    // console.log('state is ', state)
    const fullName = localStorage.getItem('fullname');
    const user_id = localStorage.getItem('id');
    const [pop, setPop] = useState(false);
    const [data, setData] = useState();


    const [toggle, setToggle] = useState(0);
    // console.log(user_id)
    const filterProduct = products.filter(cur => cur.lender_id == user_id)
    console.log(filterProduct)
    let navigate = useNavigate();
    let dispatch = useDispatch();


    const handleClickOpen = (id) => {
        setPop(true);
        setData(id);
    };
    const handleClose = () => {
        setPop(false);
        setOpen(false);
        if (alert.sev === 'success') {
            setToggle(0);
        }
    };
    const handleDelete = () => {
        dispatch(deleteProduct(data));
    }
    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value })
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        // This code is used for file upload
        const formData = new FormData();
        formData.append("profile", file);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        if (state === user && file === '') {
            setOpen(true);
            setAlert({ sev: "error", content: "Nothing to change !", });
        }
        else if (!state.fullName) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Fullname !", });
        }
        else if (!state.phone) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Phone !", });
        }
        else if (!state.email) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Email !", });
        }
        else {
            axios.post(`${process.env.REACT_APP_IPURL}/admin/profile`, formData, config)
                .then(res => {
                    state.profile = res.data.image;
                    dispatch(updateUser(state, state.id));
                    setOpen(true);

                    setAlert({ sev: "success", content: "Profile Update Successfuly !", });
                    console.log(state)
                }
                )

        }
    }

    const onChangePassword = (ev) => {
        let { name, value } = ev.target;
        setPasswordChange({ ...passwordChange, [name]: value })

        console.log(passwordChange)

    }


    useEffect(() => {

        if (fullName === null) {
            navigate('/');
        }
        else {
            dispatch(loadProducts());
            dispatch(getSingleUser(user_id))
        }
    }, [])
    useEffect(() => {
        setState(user)
    }, [user])

    const updateProfileChange = (e) => {
        const dat = e.target.files[0];
        setFile(dat);
        state.profile = dat;
        console.log(dat);
    }


    return (

        <>
            <section id='profile'>
                <div className="container">
                    <div className="col-lg-12 col-md-12 col-sm-12 padding-bottom">
                        <div className="row">
                            <div className="col-lg-3">
                                {toggle === 0 ? <div className="colum colum-img">
                                    <img src={!state ? "https://statics.olx.in/external/base/img/avatar_2.png" : `${process.env.REACT_APP_IPURL}${state.profile}`} alt="" className='img-fluid1' />

                                </div> : <div className="colum">
                                    <img src={!state ? "https://statics.olx.in/external/base/img/avatar_2.png" : `${process.env.REACT_APP_IPURL}${state.profile}`} alt="" className='img-fluid1' />
                                    <p>Change Image</p>
                                    <input type="file" name="profile" onChange={updateProfileChange} />
                                </div>}

                            </div>
                            <div className="col-lg-9">
                                <div className="colum">
                                    <div className="name-edit">
                                        <h2>{!state ? fullName : state.fullName}</h2>
                                        <Link to="#" onClick={() => setToggle(1)}>Edit Profile</Link>
                                    </div>
                                    <hr />
                                    {toggle === 0 ? <div className="col-lg-8 col-12">
                                        <h2>Account Information</h2>
                                        <div className="mb-3 mt-4 col-lg-4">
                                            <label htmlFor="inputPassword5" className="form-label" >Full Name</label>
                                        </div>
                                        <div className="mb-3 mt-3 col-lg-8">
                                            <p className="form-control capital">{!state ? "" : state.fullName}</p>
                                            {/* <input type="text" id="inputPassword1" placeholder="FullName" className="form-control" aria-describedby="passwordHelpBlock" name='fullName' value={!state ? "" : state.fullName} onChange={onChangeHandler} readOnly /> */}
                                        </div>
                                        <div className="mb-3 mt-4 col-lg-4">
                                            <label htmlFor="inputPassword5" className="form-label">Phone No.</label>
                                        </div>
                                        <div className="mb-3 mt-3 col-lg-8">
                                            <p className="form-control">{!state ? "" : state.phone}</p>
                                            {/* <input type="text" id="inputPassword2" placeholder="Phone No." className="form-control" aria-describedby="passwordHelpBlock" value={!state ? "" : state.phone} readOnly /> */}
                                        </div>
                                        {/* <div className="mb-3 mt-4 col-lg-4">
                                            <label htmlFor="inputPassword5" className="form-label">Alternate Phone No.</label>
                                        </div> */}
                                        {/* <div className="mb-3 mt-3 col-lg-8">
                                            <p className="form-control">{!state ? "" : state.alternate_phone}</p>
                                            <input type="text" id="inputPassword3" placeholder="Alternate Phone No." className="form-control" aria-describedby="passwordHelpBlock" name='alternate_phone' onChange={onChangeHandler} value={!state ? "" : state.alternate_phone} readOnly />
                                        </div> */}
                                        <div className="mb-3 mt-4 col-lg-4">
                                            <label htmlFor="inputPassword5" className="form-label">Email Address</label>
                                        </div>
                                        <div className="mb-5 mt-3 col-lg-8">
                                            <p className="form-control">{!state ? "" : state.email}</p>
                                            {/* <input type="text" id="inputPassword4" placeholder="Email Address" className="form-control" aria-describedby="passwordHelpBlock" value={!state ? "" : state.email} readOnly /> */}
                                        </div>



                                    </div> : <div className="col-lg-12 col-12">
                                        <h2>Account Information</h2>
                                        <div className="mb-3 mt-4 col-lg-4">
                                            <label htmlFor="inputPassword5" className="form-label" >Full Name</label>
                                        </div>
                                        <div className="mb-3 mt-3 col-lg-8">
                                            <input type="text" id="inputPassword1" placeholder="FullName" className="form-control" aria-describedby="passwordHelpBlock" name='fullName' value={!state ? "" : state.fullName} onChange={onChangeHandler} />
                                        </div>
                                        <div className="mb-3 mt-4 col-lg-4">
                                            <label htmlFor="inputPassword2" className="form-label">Phone No.</label>
                                        </div>
                                        <div className="mb-3 mt-3 col-lg-8">
                                            <input type="text" id="inputPassword3" placeholder="Phone No." className="form-control" aria-describedby="passwordHelpBlock" value={!state ? "" : state.phone} readOnly />
                                        </div>
                                        <div className="mb-3 mt-4 col-lg-4">
                                            <label htmlFor="inputPassword5" className="form-label">Alternate Phone No.</label>
                                        </div>
                                        <div className="mb-3 mt-3 col-lg-8">
                                            <input type="text" id="inputPassword4" placeholder="Alternate Phone No." className="form-control" aria-describedby="passwordHelpBlock" name='alternate_phone' onChange={onChangeHandler} value={!state ? "" : state.alternate_phone} />
                                        </div>
                                        <div className="mb-3 mt-4 col-lg-4">
                                            <label htmlFor="inputPassword5" className="form-label">Email Address</label>
                                        </div>
                                        <div className="mb-5 mt-3 col-lg-8">
                                            <input type="text" id="inputPassword5" placeholder="Email Address" className="form-control" aria-describedby="passwordHelpBlock" value={!state ? "" : state.email} readOnly />
                                        </div>
                                        <h2>Change Password</h2>
                                        <div className="mb-3 mt-4 col-lg-4">
                                            <label htmlFor="inputPassword6" className="form-label">Current Password</label>
                                        </div>
                                        <div className="mb-3 mt-3 col-lg-8">
                                            <input type="password" id="inputPassword6" name="current" onChange={onChangePassword} placeholder="Current Password" className="form-control" aria-describedby="passwordHelpBlock" />
                                        </div>
                                        <div className="mb-3 mt-4 col-lg-4">
                                            <label htmlFor="inputPassword" className="form-label">New Password</label>
                                        </div>
                                        <div className="mb-3 mt-3 col-lg-8">
                                            <input type="password" id="inputPassword7" name="newpassword" onChange={onChangePassword} placeholder="New Password" className="form-control" aria-describedby="passwordHelpBlock" />
                                        </div>
                                        <div className="mb-3 mt-4 col-lg-4">
                                            <label htmlFor="inputPassword5" className="form-label">Confirm Password</label>
                                        </div>
                                        <div className="mb-5 mt-3 col-lg-8">
                                            <input type="password" id="inputPassword8" name="confirm" onChange={onChangePassword} placeholder="Confirm Password" className="form-control" aria-describedby="passwordHelpBlock" />
                                        </div>
                                        <div className='d-flex justify-content-end row mt-5'>
                                            <Stack spacing={2} sx={{ width: '100%' }} id="stack">

                                                <button className="btn btn-primary col-4 mx-auto p-3" onClick={() => { setToggle(0) }}>Cancel</button>
                                                <button className="btn btn-primary col-4 mx-auto p-3" onClick={handleUpdate}>Save</button>
                                                {/* Snackbar */}
                                                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1500} onClose={handleClose}>
                                                    <Alert onClose={handleClose} severity={alert.sev} sx={{ width: '100%' }}>
                                                        {alert.content}
                                                    </Alert>
                                                </Snackbar>
                                            </Stack>
                                        </div>

                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* MUI Alert Box */}
            <Dialog
                open={pop}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"

            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleDelete}>Yes</Button>
                </DialogActions>
            </Dialog>


        </>
    )
}

export default ProfileEdit