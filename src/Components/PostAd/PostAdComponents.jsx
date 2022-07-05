import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loadCitys } from '../../Actions/cityAction';

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { Link, useNavigate } from 'react-router-dom';
import { addProduct } from '../../Actions/productAction';
import { loadCategoryes } from '../../Actions/categoryAction';
import { loadSubCategoryes } from '../../Actions/SubCategoryAction';

import Autocomplete from "react-google-autocomplete";
import axios from 'axios';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PostAdComponents = () => {
    let dispatch = useDispatch();
    const fullName = localStorage.getItem('fullname');
    const id = localStorage.getItem('id');



    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });
    const [accord, setAccord] = useState(1);

    // This code is used for file upload
    const [file, setFile] = useState();
    const [file1, setFile1] = useState();
    const [file2, setFile2] = useState();
    const [file3, setFile3] = useState();
    const [file4, setFile4] = useState();

    const [error, setError] = useState("");

    // Saving files
    const fileHandler = (e) => {
        if (e.target.name === 'images') {
            const dat = e.target.files[0];
            setFile(dat);
            state.images = dat;
        }
        else if (e.target.name === 'minImage1') {
            const dat = e.target.files[0];
            setFile1(dat);
            state.minImage1 = dat;
        }
        else if (e.target.name === 'minImage2') {
            const dat = e.target.files[0];
            setFile2(dat);
            state.minImage2 = dat;
        }
        else if (e.target.name === 'minImage3') {
            const dat = e.target.files[0];
            setFile3(dat);
            state.minImage3 = dat;
        }
        else if (e.target.name === 'minImage4') {
            const dat = e.target.files[0];
            setFile4(dat);
            state.minImage4 = dat;
        }
        // else if (e.target.name === 'minImage5') {
        //     const dat = e.target.files[0];
        //     setFile5(dat);
        //     state.minImage5 = dat;
        // }
        // else if (e.target.name === 'minImage6') {
        //     const dat = e.target.files[0];
        //     setFile6(dat);
        //     state.minImage6 = dat;
        // }
        // else if (e.target.name === 'minImage7') {
        //     const dat = e.target.files[0];
        //     setFile7(dat);
        //     state.minImage7 = dat;
        // }
        // else if (e.target.name === 'minImage8') {
        //     const dat = e.target.files[0];
        //     setFile8(dat);
        //     state.minImage8 = dat;
        // }
        // else if (e.target.name === 'minImage9') {
        //     const dat = e.target.files[0];
        //     setFile9(dat);
        //     state.minImage1 = dat;
        // }
    }





    // console.log(fullName)
    // console.log(id)

    const { citys } = useSelector(state => state.cityData);
    useEffect(() => {
        dispatch(loadCitys());
    }, []);
    const { categoryes } = useSelector(state => state.categoryData);
    useEffect(() => {
        dispatch(loadCategoryes());
    }, []);

    const { subCategoryes } = useSelector(state => state.subCategoryData);
    useEffect(() => {
        dispatch(loadSubCategoryes());
    }, []);



    const [state, setState] = useState({
        lender_id: id,
        city: "",
        category_id: "",
        sub_category_id: "",
        product_name: "",
        brand_name: "",
        description: "",
        day_price: "",
        hour_price: "",
        month_price: "",
        threemonth_price: "",
        yearly_price: "",
        discount: "",
        security_deposit: "",
        fields: "",
        faq_field: "",
        icon_field: "",
        full_field: "",
        is_featured: "1",
        is_approved: '0',
        lat: "",
        log: "",
        seller_mobile: "",
        images: "",
        minImage1: "",
        minImage2: "",
        minImage3: "",
        minImage4: "",
        minImage5: "",
        minImage6: "",
        minImage7: "",
        minImage8: "",
        minImage9: "",
        seller_name: "",
        status: "1"
    });

    const {
        city,
        category_id,
        sub_category_id,
        product_name,
        description,
        day_price,
        hour_price,
        month_price,
        threemonth_price,
        yearly_price,
        minImage1,
        minImage2,
        minImage3,
        minImage4,
        security_deposit,
        fields,
        is_featured,
        seller_mobile,
        images,
    } = state;

    // let fieldFilter=[];
    // All dynamic filter form fields 
    const [fieldFilter, setFieldFilter] = useState('');
    const [faqFieldFilter, setFaqFieldFilter] = useState('');
    const [iconFieldFilter, setIconFieldFilter] = useState('');
    const [fullFieldFilter, setFullFieldFilter] = useState('');
    const [subCatFilter, setSubCatFilter] = useState('');

    const [location, setLocation] = useState({ lat: "", lng: "" });


    const [dynamicField, setDynamicField] = useState();
    const [faqDynamicField, setFaqDynamicField] = useState();
    const [iconDynamicField, setIconDynamicField] = useState();
    const [fullDynamicField, setFullDynamicField] = useState();

    let navigate = useNavigate();
    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
        console.log(state)
        console.log(fieldFilter)
    };



    useEffect(() => {

        if (state.category_id !== '') {
            let tempCatFilter = categoryes.filter((val) => {
                return val.id == state.category_id;
            })
            setSubCatFilter(subCategoryes.filter((cur) => cur.category_id == state.category_id));
            // setSubCatFilter(tempCatFilter);
            // console.log(tempCatFilter)
            if (tempCatFilter[0].form_field !== null) {

                setFieldFilter(JSON.parse(tempCatFilter[0].form_field));
                setFaqFieldFilter(JSON.parse(tempCatFilter[0].faq_field));
                setIconFieldFilter(tempCatFilter[0]);
                setFullFieldFilter(JSON.parse(tempCatFilter[0].full_field));

                console.log("Helllo World", iconFieldFilter)
            }
            else {

                setFieldFilter('');
                setFaqFieldFilter('');
                setIconFieldFilter('');
                setFullFieldFilter('');
            }

        }
    }, [state.category_id])

    // Filter
    // useEffect(() => {
    //     if (state.sub_category_id !== '') {
    //         let tempFieldFilter = subCategoryes.filter((val) => {
    //             return val.id == state.sub_category_id;
    //         })
    //         setFieldFilter(JSON.parse(tempFieldFilter[0].form_field))
    //     }
    // }, [state.sub_category_id])


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

    // FILLED ERROR
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(location)
        state.lat = location.lat;
        state.log = location.lng;

        // This code is used for file upload
        const formData = new FormData();
        formData.append("images", file);
        formData.append("minImage1", file1);
        formData.append("minImage2", file2);
        formData.append("minImage3", file3);
        formData.append("minImage4", file4);

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        if (!city) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select City !", });
        }

        else if (!category_id) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Sub Category !", });
        }
        else if (!sub_category_id) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Sub Category !", });
        }
        else if (!product_name) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Product Name !", });
        }
        else if (!state.brand_name) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Product Name !", });
        }
        else if (!description) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Description !", });
        }
        else if (!images && !state.minImage1 && !state.minImage2 && !state.minImage3 && !state.minImage4) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Upload All Images !", });
        }
        else if (!seller_mobile) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Phone number !", });
        }
        else if (!state.lat && !state.log) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Location !", });
        }
        else if (!hour_price && !day_price && !month_price && !threemonth_price && !yearly_price) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Price !", });
        }
        else if (!state.minImage5 && !state.minImage6 && !state.minImage7 && !state.minImage8 && !state.minImage9) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Specification Data !", });
        }
        // else if (!month_price) {
        //     setOpen(true);
        //     setAlert({ sev: "error", content: "Please Fill Month Price !", });
        // }
        // else if (!is_featured) {
        //     setOpen(true);
        //     setAlert({ sev: "error", content: "Please Select Featured !", });
        // }
        else {
            // This code is used for file upload
            axios.post(`${process.env.REACT_APP_IPURL}/admin/product`, formData, config)
                .then(response => {
                    console.log(response);
                    state.images = response.data.image;
                    state.minImage1 = response.data.image1;
                    state.minImage2 = response.data.image2;
                    state.minImage3 = response.data.image3;
                    state.minImage4 = response.data.image4;
                    // Green Snackbar
                    setOpen(true);

                    state.fields = JSON.stringify(dynamicField);
                    state.faq_field = JSON.stringify(faqDynamicField);
                    state.icon_field = JSON.stringify(iconDynamicField);
                    state.full_field = JSON.stringify(fullDynamicField);
                    setAlert({ sev: "success", content: "Added Successfully", });
                    dispatch(addProduct(state));

                })
                .catch(error)
            {
                console.log(error);
            }
        }
    };

    // Cancel Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        if (alert.sev === 'success') {
            navigate("/profile");
        }
    };




    return <div className="mt-4 d-flex justify-content-center">{
        fullName !== null ? <div className="container mt-4">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create New Product</h4>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Select City <span className='red'>*</span></label>
                                    <div className="col-sm-9">
                                        <select name="city" id="" className="form-control" value={state.city} onChange={onChangeHandler}>
                                            <option value="">Select City</option>

                                            {citys.map((val) => {
                                                return <option value={val.id}>{val.city_name}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Select Category <span className='red'>*</span></label>
                                    <div className="col-sm-9">
                                        <select name="category_id" id="" className="form-control " value={state.category_id} onChange={onChangeHandler}>
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
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Select Sub Category <span className='red'>*</span></label>
                                    <div className="col-sm-9">
                                        <select name="sub_category_id" id="" className="form-control " value={state.sub_category_id} onChange={onChangeHandler}>
                                            <option value="">Select Sub Category</option>
                                            {subCatFilter.length !== 0 ? subCatFilter &&
                                                subCatFilter.map((count) => {
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
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Product Name <span className='red'>*</span></label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="product_name" placeholder='Product Name' value={state.product_name} onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Brand Name <span className='red'>*</span></label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="brand_name" placeholder='Brand Name' value={state.brand_name} onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Product Description <span className='red'>*</span></label>
                                    <div className="col-sm-9">
                                        <textarea cols="15" rows="10" maxlength="256" className="form-control" name="description" value={state.description} onChange={onChangeHandler} placeholder="Product Description"></textarea>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Product Amount (Hour)</label>
                                    <div className="col-sm-9">
                                        <input type="number" min="0" className="form-control" name="hour_price" value={state.hour_price} onChange={onChangeHandler} placeholder="Product Amount (Hour)" onWheel={(e) => e.target.blur()} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Product Amount (Days)</label>
                                    <div className="col-sm-9">
                                        <input type="number" min="0" className="form-control" name="day_price" value={state.day_price} onChange={onChangeHandler} placeholder="Product Amount (Days)" onWheel={(e) => e.target.blur()} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Product Amount (Month)</label>
                                    <div className="col-sm-9">
                                        <input type="number" min="0" className="form-control" name="month_price" value={state.month_price} onChange={onChangeHandler} placeholder="Product Amount (Month)" onWheel={(e) => e.target.blur()} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Product Amount (Quarterly)</label>
                                    <div className="col-sm-9">
                                        <input type="number" min="0" className="form-control" name="threemonth_price" value={state.threemonth_price} onChange={onChangeHandler} placeholder="Product Amount (Quarterly)" onWheel={(e) => e.target.blur()} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Product Amount (Yearly)</label>
                                    <div className="col-sm-9">
                                        <input type="number" min="0" className="form-control" name="yearly_price" value={state.yearly_price} onChange={onChangeHandler} placeholder="Product Amount (Yearly)" onWheel={(e) => e.target.blur()} />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Discount (%)</label>
                                    <div className="col-sm-9">
                                        <input type="number" min="0" className="form-control" name="discount" value={state.discount} onChange={onChangeHandler} onWheel={(e) => e.target.blur()} placeholder='Discount' max="2" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Security Deposit</label>
                                    <div className="col-sm-9">
                                        <input type="number" className="form-control" name="security_deposit" value={state.security_deposit} onChange={onChangeHandler} onWheel={(e) => e.target.blur()} placeholder='Security Deposit' min="0" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">cover <span className='red'>*</span></label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" name="images" onChange={fileHandler} />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Display Image <span className='red'>*</span></label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" name="minImage1" onChange={fileHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Display Image <span className='red'>*</span></label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" name="minImage2" onChange={fileHandler} />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Display Image <span className='red'>*</span></label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" name="minImage3" onChange={fileHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Display Image <span className='red'>*</span></label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" name="minImage4" onChange={fileHandler} />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Location <span className='red'>*</span></label>
                                    <div className="col-sm-9">
                                        <Autocomplete
                                            className="form-control"
                                            apiKey={'AIzaSyBjNd5-n0m0NtT1qA4iKmgM3ahD2Podpas'}
                                            options={{
                                                types: ["(regions)"],

                                            }}

                                            onPlaceSelected={(place) => {
                                                setLocation({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() })
                                            }}

                                        />
                                    </div>

                                </div>



                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Phone Number <span className='red'>*</span></label>
                                    <div className="col-sm-9">
                                        <input type="number" min="0" className="form-control" name="seller_mobile" placeholder='Phone Number' value={state.seller_mobile} onChange={onChangeHandler} onWheel={(e) => e.target.blur()} />
                                    </div>
                                </div>

                                {/* <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Address <span className='red'>*</span></label>
                                    <div className="col-sm-9">
                                        <input type="number" min="0" className="form-control" name="seller_mobile" placeholder='Phone Number' onChange={onChangeHandler} onWheel={(e) => e.target.blur()} />
                                    </div>
                                </div> */}

                            </div>
                            <div className="col-md-6">

                                <div className="accordion">
                                    <div className="accordion-item">
                                        <div className="accordion-item-header" onClick={() => { setAccord(1) }}>
                                            Fields
                                        </div>
                                        <div className="accordion-item-body" style={{ display: accord === 1 ? 'contents' : 'none' }}>
                                            <div className="accordion-item-body-content">
                                                {fieldFilter !== '' ? fieldFilter.map((count, i) => {
                                                    return (<div className="form-group row" key={i}>
                                                        {
                                                            count.type === 'dropdown' ? <><label className="col-sm-3 col-form-label">{count.field}</label>
                                                                <div className="col-sm-9">
                                                                    <select className='form-control' name={count.field} onChange={(e) => dynamicFieldHandler(e, '1')}>
                                                                        <option>Select</option>
                                                                        {count.options && count.options.map((val) => {
                                                                            return <option value={val}>{val}</option>
                                                                        })}

                                                                    </select>
                                                                </div></> : count.type === 'radio' ? <>
                                                                    <label className="col-sm-3 col-form-label">{count.field}</label>
                                                                    <div className="col-sm-9">
                                                                        <div className="form-group row">
                                                                            {count.options && count.options.map((val) => {
                                                                                return <div className="col-sm-3 d-flex align-items-center"><input type={count.type} value={val} name={count.field} onChange={(e) => dynamicFieldHandler(e, '1')} /><label className="mt-2 ml-2">{val}</label><br /></div>
                                                                            })}
                                                                        </div>
                                                                    </div>


                                                                </> : <><label className="col-sm-3 col-form-label">{count.field}</label>
                                                                <div className="col-sm-9">
                                                                    <input type={count.type} className="form-control" name={count.field} onChange={(e) => dynamicFieldHandler(e, '1')} />
                                                                </div></>
                                                        }
                                                    </div>)
                                                }) : <h4>Not Found</h4>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item">
                                        <div className="accordion-item-header" onClick={() => { setAccord(3) }}>
                                            Full Specification (Icon)
                                        </div>
                                        <div className="accordion-item-body" style={{ display: accord === 3 ? 'contents' : 'none' }}>
                                            {state.category_id !== '' ? <div className="accordion-item-body-content">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <img src={`${process.env.REACT_APP_IPURL}${iconFieldFilter.icon1}`} alt={iconFieldFilter.icon1Title} height="100px" width="100px" />
                                                        <h6>{iconFieldFilter.icon1Title}</h6>

                                                    </div>
                                                    <div className="col-8">
                                                        <input type="text" className="form-control" name="minImage5" placeholder='Input' value={state.minImage5} onChange={onChangeHandler} />
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <img src={`${process.env.REACT_APP_IPURL}${iconFieldFilter.icon2}`} alt={iconFieldFilter.icon2Title} height="100px" width="100px" />
                                                        <h6>{iconFieldFilter.icon2Title}</h6>

                                                    </div>
                                                    <div className="col-8">
                                                        <input type="text" className="form-control" name="minImage6" placeholder='Input' value={state.minImage6} onChange={onChangeHandler} />
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <img src={`${process.env.REACT_APP_IPURL}${iconFieldFilter.icon3}`} alt={iconFieldFilter.icon3Title} height="100px" width="100px" />
                                                        <h6>{iconFieldFilter.icon3Title}</h6>

                                                    </div>
                                                    <div className="col-8">
                                                        <input type="text" className="form-control" name="minImage7" placeholder='Input' value={state.minImage7} onChange={onChangeHandler} />
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <img src={`${process.env.REACT_APP_IPURL}${iconFieldFilter.icon4}`} alt={iconFieldFilter.icon4Title} height="100px" width="100px" />
                                                        <h6>{iconFieldFilter.icon4Title}</h6>

                                                    </div>
                                                    <div className="col-8">
                                                        <input type="text" className="form-control" name="minImage8" placeholder='Input' value={state.minImage8} onChange={onChangeHandler} />
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <img src={`${process.env.REACT_APP_IPURL}${iconFieldFilter.icon5}`} alt={iconFieldFilter.icon5Title} height="100px" width="100px" />
                                                        <h6>{iconFieldFilter.icon5Title}</h6>

                                                    </div>
                                                    <div className="col-8">
                                                        <input type="text" className="form-control" name="minImage9" placeholder='Input' value={state.minImage9} onChange={onChangeHandler} />
                                                    </div>

                                                </div>
                                            </div> : <div className="accordion-item-body-content"><h4>Not Found</h4></div>}

                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <div className="accordion-item-header" onClick={() => { setAccord(4) }}>
                                            Full Specification
                                        </div>
                                        <div className="accordion-item-body" style={{ display: accord === 4 ? 'contents' : 'none' }}>
                                            <div className="accordion-item-body-content">
                                                {fullFieldFilter !== '' && state.category_id !== '' ? fullFieldFilter.map((count, i) => {
                                                    return (<div className="form-group row" key={i}>
                                                        <label className="col-sm-3 col-form-label">{count}</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" className="form-control" name={count} onChange={(e) => dynamicFieldHandler(e, '4')} />
                                                        </div>
                                                    </div>)
                                                }) : <h4>Not Found</h4>}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <Stack spacing={2} sx={{ width: '30%' }} id="stack" className="d-flex justify-center">
                            <Link to="/" className="btn btn-light">Cancel</Link>

                            <button className="btn btn-primary mr-2 ml-2" onClick={handleSubmit}>Submit</button>
                            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1500} onClose={handleClose}>
                                <Alert onClose={handleClose} severity={alert.sev} sx={{ width: '100%' }}>
                                    {alert.content}
                                </Alert>
                            </Snackbar>
                        </Stack>

                    </div>
                </div>
            </div>
        </div> : <h3 className="text-center">Please Login First</h3>
    }
    </div>



}

export default PostAdComponents

