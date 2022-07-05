import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { deleteProduct, loadProducts, updateProduct } from '../../Actions/productAction';
import axios from 'axios';

// MUI Import
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { loadSubCategoryes } from '../../Actions/SubCategoryAction';
import { loadCategoryes } from '../../Actions/categoryAction';
import { loadCitys } from '../../Actions/cityAction';

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import VisibilityIcon from '@mui/icons-material/Visibility';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ViewMyAds = () => {
    const [pop, setPop] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });
    const [open, setOpen] = useState(false);
    const [filterSubCat, setFilterSubCat] = useState();
    const [editFilter, setEditFilter] = useState();

    const [edit, setEdit] = useState();
    const [editId, setEditId] = useState();

    // All Edit Data
    // All dynamic filter form fields 
    const [fieldFilter, setFieldFilter] = useState('');
    const [faqFieldFilter, setFaqFieldFilter] = useState('');
    const [iconFieldFilter, setIconFieldFilter] = useState('');
    const [fullFieldFilter, setFullFieldFilter] = useState('');
    const [subCatFilter, setSubCatFilter] = useState('');

    const [dynamicField, setDynamicField] = useState();
    const [faqDynamicField, setFaqDynamicField] = useState();
    const [iconDynamicField, setIconDynamicField] = useState();
    const [fullDynamicField, setFullDynamicField] = useState();

    const [state, setState] = useState({
        city: "",
        category_id: "",
        sub_category_id: "",
        product_name: "",
        description: "",
        day_price: "",
        hour_price: "",
        month_price: "",
        discount: "",
        security_deposit: "",
        fields: "",
        faq_field: "",
        icon_field: "",
        full_field: "",
        is_featured: "",
        images: "",
        status: ""
    });

    const [accord, setAccord] = useState(1);
    const [data, setData] = useState();
    let navigate = useNavigate();


    const { products } = useSelector(state => state.productData);
    // LOAD ACTIONS
    const { subCategoryes } = useSelector(state => state.subCategoryData);

    const fullName = localStorage.getItem('fullname');

    const user_id = localStorage.getItem('id');
    // console.log(user_id);
    const filterProduct = products.filter(cur => cur.lender_id == user_id)
    // console.log(filterProduct)
    let dispatch = useDispatch();
    const handleClickOpen = (id) => {
        setPop(true);
        setData(id);
    };
    const handleClose = () => {
        setPop(false);
        setOpen(false)
        if (alert.sev === 'success') {
            setEdit(false);
        }
    };
    const handleDelete = () => {
        dispatch(deleteProduct(data));
    }

    useEffect(() => {
        if (fullName === null) {
            navigate('/');
        }
        else {
            dispatch(loadProducts());
        }
    }, [])

    // All Edit Data

    const editProduct = (id) => {
        setEdit(true);
        setEditId(id);
        axios.get(`${process.env.REACT_APP_IPURL}/admin/edit-products`)
            .then((res) => {
                const productFinder = res.data.filter((cur) => cur.id === id)
                setState(productFinder[0]);
                setFilterSubCat(subCategoryes.filter((cur) => cur.category_id == productFinder[0].category_id));
                if (state) {
                    setFieldFilter([!productFinder[0].fields ? <h4>Not Found</h4> : Object.entries(JSON.parse(productFinder[0].fields)).map(([key, value]) => {
                        return <div className="form-group row" key={key}>
                            <label className="col-sm-3 col-form-label">{key}</label>
                            <div className="col-sm-9">
                                <input type='text' className="form-control" name={value} value={value} onChange={(e) => dynamicFieldHandler(e, '1')} />
                            </div>
                        </div>
                    })]);
                    setIconFieldFilter([!productFinder[0].icon_field ? <h4>Not Found</h4> : Object.entries(JSON.parse(productFinder[0].icon_field)).map(([key, value]) => {
                        return <div className="form-group row" key={key}>
                            <label className="col-sm-3 col-form-label">{key}</label>
                            <div className="col-sm-9">
                                <input type='text' className="form-control" name={value} value={value} onChange={(e) => dynamicFieldHandler(e, '1')} />
                            </div>
                        </div>
                    })]);
                    setFullFieldFilter([!productFinder[0].full_field ? <h4>Not Found</h4> : Object.entries(JSON.parse(productFinder[0].full_field)).map(([key, value]) => {
                        return <div className="form-group row" key={key}>
                            <label className="col-sm-3 col-form-label">{key}</label>
                            <div className="col-sm-9">
                                <input type='text' className="form-control" name={value} value={value} onChange={(e) => dynamicFieldHandler(e, '1')} />
                            </div>
                        </div>
                    })]);
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }


    // LOAD ACTIONS
    const { citys } = useSelector(state => state.cityData);
    const { categoryes } = useSelector(state => state.categoryData);
    useEffect(() => {
        dispatch(loadCitys());
        dispatch(loadCategoryes());
        dispatch(loadSubCategoryes());
        // eslint-disable-next-line
    }, []);

    // LOAD ACTIONS ENDS

    // for validation errors
    const [error, setError] = useState("");

    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
        console.log(state)
    };




    useEffect(() => {
        if (state) {
            console.log("checkin data", state);
            // eslint-disable-next-line
        }
    }, [])

    const dynamicFieldHandler = (e, finder) => {
        let { name, value } = e.target;
        if (finder === '1') {
            setDynamicField({ ...dynamicField, [name]: value });
        }
        else if (finder === '2') {
            setFaqDynamicField({ ...faqDynamicField, [name]: value });
        }
        else if (finder === '3') {
            setIconDynamicField({ ...iconDynamicField, [name]: value });
        }
        else {
            setFullDynamicField({ ...fullDynamicField, [name]: value });
        }
    }

    // for submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!state.city) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select City !", });
        }
        else if (!state.category_id) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Category !", });
        }
        else if (!state.sub_category_id) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Sub Category !", });
        }
        else if (!state.product_name) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Product Name !", });
        }
        else if (!state.description) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Description !", });
        }
        else if (!state.day_price && !state.hour_price && !state.month_price) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Price !", });
        }

        else if (!state.discount) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Discount !", });
        }
        else if (!state.security_deposit) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Security Deposit !", });
        }

        else {
            setOpen(true);
            setAlert({ sev: "success", content: "Updated Successfully !", });
            dispatch(updateProduct(state, editId));
            setError("");
        }
    };

    return (
        <>
            <div className="col-lg-12 overFlowScrollWeek">
                <div className="row mb-3 p-5 m-0">
                    <div className="section-title text-center j-center mb-50" style={{ display: "contents" }}>
                        <h2>Your Ads</h2>
                    </div>
                </div>
                {filterProduct.length !== 0 ? filterProduct && filterProduct.map((cur) => {
                    return <div className="col-lg-3 col-sm-12" style={{ marginBottom: "1rem" }} >
                        <Link to={`/product/${cur.product_name}/${cur.id}`}>
                            <div className="ad main-ad">
                                <div className="d-flex justify-content-end p-0 m-0">
                                    <Link className="p-0" to={`/product/${cur.product_name}/${cur.id}`}><VisibilityIcon style={{ color: '#1acdf1' }} /></Link>
                                </div>
                                <figure>
                                    <img src={`${process.env.REACT_APP_IPURL}${cur.images}`} alt="" className='img-fluid' />
                                </figure>
                                <h3 className='text-center'>{cur.product_name}</h3>
                                <h5 className='text-center'>₹{cur.hour_price} - ₹{cur.month_price}</h5>
                                {/* <p className='product_descripton text-center'>{cur.description}</p> */}
                                <div className='d-flex justify-content-end row'>

                                    <Link className="btn btn-primary col-5 mx-auto p-3" to="#" onClick={() => editProduct(cur.id)}>Edit</Link>
                                    <button className="btn btn-primary col-5 mx-auto p-3" onClick={() => { handleClickOpen(cur.id) }}>remove</button>

                                </div>
                            </div>
                        </Link>
                    </div>
                }) : <div className='col-lg-12 d-flex justify-content-center'><h3>Products Not Found</h3></div>}
            </div>

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

            {/* <!-- Edit Product Modal --> */}

            <Dialog
                open={edit}
                maxWidth={'lg'}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className="container">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="back">
                                            <h4 className="card-title">Edit Product</h4>
                                            <Link to="" onClick={() => setEdit(false)}>Back</Link>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Select City</label>
                                                    <select name="city" id="" className="col-sm-8 form-control"  value={!state ? "" : state.city} onChange={onChangeHandler}>
                                                        <option value="">Select City</option>

                                                        {citys.map((val, i) => {
                                                            return <option value={val.id} key={i}>{val.city_name}</option>
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Select Category</label>
                                                    <select name="category_id" id="" className="col-sm-8 form-control " value={!state ? "" : state.category_id} onChange={onChangeHandler}>
                                                        <option value="">Select Category</option>
                                                        {categoryes &&
                                                            categoryes.map((counts, i) => {
                                                                return (
                                                                    <option
                                                                        value={counts.id}
                                                                        key={i}>
                                                                        {counts.category_name}
                                                                    </option>
                                                                );
                                                            })}
                                                    </select>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Select Sub Category</label>
                                                    <select name="sub_category_id" id="" className="col-sm-8 form-control " value={!state ? "" : state.sub_category_id} onChange={onChangeHandler}>
                                                        <option value="">Select Sub Category</option>
                                                        {filterSubCat !== '' ? filterSubCat &&
                                                            filterSubCat.map((count) => {
                                                                return (
                                                                    <option
                                                                        value={count.id}
                                                                    >
                                                                        {count.name}
                                                                    </option>
                                                                );
                                                            }) : <option value="" disabled>
                                                            Not Found
                                                        </option>}
                                                    </select>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Product Name</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="form-control" name="product_name" placeholder='Product Name' value={!state ? "" : state.product_name} onChange={onChangeHandler} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Product Description</label>
                                                    <div className="col-sm-9">
                                                    <textarea cols="15" rows="10" maxlength="256" className="form-control" name="description" value={state.description} onChange={onChangeHandler} placeholder="Product Description" >
                                                    {!state ? "" : state.description}
                                                    </textarea>
                                                        {/* <textarea className="form-control" name="description" onChange={onChangeHandler}>
                                                             <textarea /> */}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Product Amount (Hour)</label>
                                                    <div className="col-sm-9">
                                                        <input type="number" className="form-control" name="hour_price" value={!state ? "" : state.hour_price} onChange={onChangeHandler} placeholder="Product Amount (Hour)" onWheel={(e) => e.target.blur()} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Product Amount (Days)</label>
                                                    <div className="col-sm-9">
                                                        <input type="number" className="form-control" name="day_price" value={!state ? "" : state.day_price} onChange={onChangeHandler} placeholder="Product Amount (Days)" onWheel={(e) => e.target.blur()} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Product Amount (Month)</label>
                                                    <div className="col-sm-9">
                                                        <input type="number" className="form-control" name="month_price" value={!state ? "" : state.month_price} onChange={onChangeHandler} placeholder="Product Amount (Month)" onWheel={(e) => e.target.blur()} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Product Amount (Quarterly)</label>
                                                    <div className="col-sm-9">
                                                        <input type="number" className="form-control" name="threemonth_price" value={!state ? "" : state.threemonth_price} onChange={onChangeHandler} placeholder="Product Amount (Quality)" onWheel={(e) => e.target.blur()} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Product Amount (Yearly)</label>
                                                    <div className="col-sm-9">
                                                        <input type="number" className="form-control" name="yearly_price" value={!state ? "" : state.yearly_price} onChange={onChangeHandler} placeholder="Product Amount (Yearly)" onWheel={(e) => e.target.blur()} />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Discount (%)</label>
                                                    <div className="col-sm-9">
                                                        <input type="number" className="form-control" name="discount" value={!state ? "" : state.discount} onChange={onChangeHandler} onWheel={(e) => e.target.blur()} placeholder='Discount' max="2" />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Security Deposit</label>
                                                    <div className="col-sm-9">
                                                        <input type="number" className="form-control" name="security_deposit" value={!state ? "" : state.security_deposit} onChange={onChangeHandler} onWheel={(e) => e.target.blur()} placeholder='Security Deposit' min="0" />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Cover Image</label>
                                                    <div className="col-sm-9">
                                                        <input type="file" className="form-control" name="images" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Display Image</label>
                                                    <div className="col-sm-9">
                                                        <input type="file" className="form-control" name="minImage1" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Display Image</label>
                                                    <div className="col-sm-9">
                                                        <input type="file" className="form-control" name="minImage2" />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Display Image</label>
                                                    <div className="col-sm-9">
                                                        <input type="file" className="form-control" name="minImage3" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Display Image</label>
                                                    <div className="col-sm-9">
                                                        <input type="file" className="form-control" name="minImage4" />
                                                    </div>
                                                </div>
                                                {/* <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Display Image</label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" name="minImage5" onChange={fileHandler} />
                                    </div>
                                </div> */}
                                                {/* <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Display Image</label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" name="minImage6" onChange={fileHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Display Image</label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" name="minImage7" onChange={fileHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Display Image</label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" name="minImage8" onChange={fileHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Display Image</label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" name="minImage9" onChange={fileHandler} />
                                    </div>
                                </div> */}

                                                <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                                                    <Link to="#" className="btn btn-light" onClick={() => setEdit(false)}>Cancel</Link>

                                                    <button className="btn btn-primary mr-2 ml-2" onClick={handleSubmit}>Submit</button>
                                                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1500} onClose={handleClose}>
                                                        <Alert onClose={handleClose} severity={alert.sev} sx={{ width: '100%' }}>
                                                            {alert.content}
                                                        </Alert>
                                                    </Snackbar>
                                                </Stack>
                                            </div>
                                            <div className="col-md-6">

                                                <div className="accordion">
                                                    <div className="accordion-item">
                                                        <div className="accordion-item-header" onClick={() => { setAccord(1) }}>
                                                            Fields
                                                        </div>
                                                        <div className="accordion-item-body" style={{ display: accord === 1 ? 'contents' : 'none' }}>
                                                            <div className="accordion-item-body-content">
                                                                {fieldFilter}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* <div className="accordion-item">
                                                        <div className="accordion-item-header" onClick={() => { setAccord(3) }}>
                                                            Full Specification (Icon)
                                                        </div>
                                                        <div className="accordion-item-body" style={{ display: accord === 3 ? 'contents' : 'none' }}>
                                                            <div className="accordion-item-body-content">
                                                                {iconFieldFilter}
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    <div className="accordion-item">
                                                        <div className="accordion-item-header" onClick={() => { setAccord(4) }}>
                                                            Full Specification
                                                        </div>
                                                        <div className="accordion-item-body" style={{ display: accord === 4 ? 'contents' : 'none' }}>
                                                            <div className="accordion-item-body-content">
                                                                {fullFieldFilter}
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ViewMyAds
