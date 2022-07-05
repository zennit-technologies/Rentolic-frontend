import { keyframes } from '@emotion/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { loadProducts } from '../../../Actions/productAction';
import Review from '../Review/Review';
import SimiliarProduct from '../SimiliarProduct/SimiliarProduct';

// MUI Import 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import SocialShare from '../../SocialShare/SocialShare';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { Rating, Tooltip } from '@mui/material';

import { loadCategoryes } from '../../../Actions/categoryAction';
import ReviewScreen from '../Review/ReviewScreen';


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Rateing from '../../Common/Rating/Rateing';


const Specification = () => {

    // const [field,setField]=useState();
    const fullName = localStorage.getItem('fullname')
    const [toggle, setToggle] = useState(1);
    const [accord, setAccord] = useState(0);
    const [open, setOpen] = useState(false);
    const [map, setMap] = useState(/** @type google.maps.Map */(null))

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open2 = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const [open3, setOpen3] = useState(false);

    const handleTooltipClose = () => {
        setOpen3(false);
        setAnchorEl(null);
    };

    const handleTooltipOpen = () => {
        setOpen3(true);
    };



    const { product_id } = useParams();
    console.log(product_id)

    let dispatch = useDispatch();
    const { products } = useSelector(state => state.productData);
    console.log(products)
    useEffect(() => {
        dispatch(loadProducts());
    }, []);
    const { categoryes } = useSelector(state => state.categoryData);
    useEffect(() => {
        dispatch(loadCategoryes());
    }, []);
    // console.log(products)
    const filterProduct = products.filter((cur) => {
        return cur.id == product_id
    })
    const filterCategory = categoryes.length !== 0 && filterProduct.length !== 0 ? categoryes.filter((cur) => cur.id == filterProduct[0].category_id) : [];
    console.log("filter", filterCategory)
    const fieldWithKey = filterProduct.length !== 0 ? filterProduct[0].fields != null ? Object.entries(JSON.parse(filterProduct[0].fields)).map(([key, value]) => {
        return <td className='col-6'>
            <h6>{key}</h6>
            <span>{value}</span>
        </td>
    }) : <h4>Not Found</h4> : <h4>Not Found</h4>;

    const fullFieldWithKey = filterProduct.length !== 0 ? filterProduct[0].full_field != null ? Object.entries(JSON.parse(filterProduct[0].full_field)).map(([key, value]) => {
        return <div className="col-lg-5 col-12 mx-auto">
            <div className='d-flex justify-content-around' style={{ marginBottom: '-1.50rem' }}>
                <h5>{key} :</h5>
                <h5>{value}</h5>

            </div>
            <hr />
        </div>
    }) : <h4>Not Found</h4> : <h4>Not Found</h4>;

    const fullFaqWithKey = filterCategory.length !== 0 ? filterCategory[0].faq_field != null ? JSON.parse(filterCategory[0].faq_field).map((cur, i) => {
        return <div className="accordion-item" key={i}>
            <div className="accordion-item-header" onClick={() => { setAccord(i) }}>
                {cur.question}
            </div>
            <div className="accordion-item-body" style={{ display: accord === i ? 'contents' : 'none' }}>
                <div className="accordion-item-body-content" >
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">{cur.answer}</label>
                    </div>

                </div>
            </div>
        </div>
    }) : <h4>Not Found</h4> : <h4>Not Found</h4>;

    // setField(fieldWithKey)

    console.log(filterProduct);
    // const temp=filterProduct && filterProduct[0].hour_price/filterProduct[0].discount;
    // const final=filterProduct && filterProduct[0].hour_price-temp
    // console.log(final)

    const handleClose = () => {

        setOpen(false)
        setAnchorEl(null);

    };

    const getLocation = (lat, lng) => {
        console.log(parseFloat(lat), parseFloat(lng));
        setOpen(true);
        // setCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
        // console.log(center)
    }

    // New Map Direction
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBjNd5-n0m0NtT1qA4iKmgM3ahD2Podpas",
        libraries: ['places'],
    })
    if (!isLoaded) {
        return <div className="col-lg-12">
            <div className="section-title text-center">
                <h3>{`Ooops ! Please Connect Internet`}</h3>

            </div>
        </div>
    }

    return (
        <>
            <div claLinksName="shop-area pt-120 pb-70 " style={{ paddingTop: "2rem" }}>
                <div className="container-fluid extra-padding">
                    <div className="row mb-2">
                        <div className="col-lg-12">
                            <div className="page-title text-left maruti-suzuki mb-20">
                                <div className="rating-star d-flex">
                                    <h4>{filterProduct.length === 0 ? <h2>Product Name</h2> : filterProduct[0].product_name} &nbsp;&nbsp;</h4>
                                    {/* <Rateing
                                        value={filterProduct[0].avg_rating}
                                    // text={product.numReviews + ' reviews'}
                                    /> */}
                                    <Rating name="read-only" value={filterProduct[0].avg_rating} readOnly />
                                </div>
                                <nav aria-label="breadcrumb ">
                                    <ol className="breadcrumb justify-content-left pb-4 ">
                                        <li className="breadcrumb-item">
                                            <Link to="#" onClick={() => setToggle(1)}>OVERVIEW</Link>
                                        </li>
                                        {/* <li className="breadcrumb-item">
                                            <Link to="#">IMAGES</Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link to="#" onClick={() => setToggle(2)}>FULL SPECIFICATIONS</Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link to="#" onClick={() => setToggle(3)}>REVIEW</Link>
                                        </li> */}

                                        {/* <!-- <li className="breadcrumb-item active" aria-current="page"> Product details</li> --> */}
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-5 pt-4 product-car">
                            <Carousel
                                className='Carousel'
                                showThumbs={true}
                                showStatus={false}
                                infiniteLoop
                                // emulateTouch
                                autoPlay
                                // useKeyboardArrows
                                transitionTime={1000}
                                // axis="vertical"
                                // selectedItem={1}
                                // width="300px"
                                height="300px"
                            >

                                <div className="slide-holder product-car">
                                    <img
                                        alt=""
                                        src={`${process.env.REACT_APP_IPURL}${filterProduct[0]?.images}`}
                                    />
                                </div>
                                <div className="slide-holder">
                                    <img
                                        alt=""
                                        src={`${process.env.REACT_APP_IPURL}${filterProduct[0]?.minImage1}`}
                                    />
                                </div>
                                <div className="slide-holder">
                                    <img
                                        alt=""
                                        src={`${process.env.REACT_APP_IPURL}${filterProduct[0]?.minImage2}`}
                                    />
                                </div>
                                <div className="slide-holder">
                                    <img
                                        alt=""
                                        src={`${process.env.REACT_APP_IPURL}${filterProduct[0]?.minImage3}`}
                                    />
                                </div>
                                <div className="slide-holder">
                                    <img
                                        alt=""
                                        src={`${process.env.REACT_APP_IPURL}${filterProduct[0]?.minImage4}`}
                                    />
                                </div>

                            </Carousel>

                            {toggle !== 2 ? <div className="pb-4">
                                <h4 className="about-heading text-dark">About the product</h4>
                                <p className="about-paragrph mt-4">{filterProduct.length === 0 ? <h2>Product Description</h2> : filterProduct[0].description}</p>
                                {/* <Link to="#" className="about-link text-secondary">Read More+</Link> */}
                            </div> : null}
                        </div>
                        <div className="col-xl-7 col-lg-7">
                            <div className="product-desc mb-50">
                                <div className="product-cat mt-20">
                                    <ul>

                                        <li>{filterProduct.length === 0 ? <h2>Share</h2> : fullName !== null ? <span className="d-flex align-items-center justify-content-left share-mobile" style={{ fontSize: '19px', fontWeight: "600" }}><div><h4>Get Us On:</h4></div> <a href={`tel:${filterProduct[0].seller_mobile}`} className="d-flex flex-column justify-content-center align-items-center ml-4 mr-4" target="_blank"><img src="/img/icon/telephone.png" alt="" height="35" width="35" /><label className="text-center text-muted m-0">Call</label></a><a href={`https://wa.me/${filterProduct[0].seller_mobile}`} className="d-flex flex-column justify-content-center align-items-center ml-4 mr-4" target="_blank"><img src="/img/icon/whatsapp.png" alt="" height="40" width="40" /><label className="text-center text-muted m-0">Whatsapp</label></a>
                                            <Link to="" onClick={() => getLocation(filterProduct[0].lat, filterProduct[0].log)} className="d-flex flex-column justify-content-center align-items-center ml-4 mr-4" ><img src="/img/icon/location.png" alt="" height="40" width="40" /><label className="text-center text-muted m-0">Location</label></Link>
                                            <IconButton
                                                id="basic-button"
                                                className="d-flex flex-column justify-content-center align-items-center ml-4 mr-4"
                                                aria-controls={open2 ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open2 ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                <ShareIcon style={{ color: "black", fontSize: "32px" }} />
                                                <label className="text-center text-muted m-0">Share</label>
                                            </IconButton>

                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open2}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <Tooltip
                                                    PopperProps={{
                                                        disablePortal: true,
                                                    }}
                                                    onClose={handleTooltipClose}
                                                    open={open3}
                                                    disableFocusListener
                                                    disableHoverListener
                                                    disableTouchListener
                                                    title="Copied"
                                                // placement="right"
                                                >
                                                    <MenuItem onClick={() => { navigator.clipboard.writeText(window.location.href); handleTooltipOpen() }}><ContentPasteIcon style={{ color: 'black' }} /></MenuItem>
                                                </Tooltip>
                                                {
                                                    SocialShare.map((val) => {
                                                        return <a href={`${val.link}${window.location.href}`} target="_blank"><MenuItem onClick={handleClose}>{val.icon}</MenuItem></a>
                                                    })
                                                }
                                            </Menu>
                                        </span>
                                            : <span className="d-flex align-items-center" style={{ fontSize: '19px', fontWeight: "600" }}>Get Us On:  <Link to="/signIn" className="d-flex flex-column justify-content-center align-items-left ml-4 mr-4" ><img src="/img/icon/telephone.png" alt="" height="35" width="35" /><label className="text-center text-muted m-0">Call</label></Link><Link to="/signIn" className="d-flex flex-column justify-content-center align-items-center ml-4 mr-4" ><img src="/img/icon/whatsapp.png" alt="" height="40" width="40" /><label className="text-center text-muted m-0">Whatsapp</label></Link>
                                                <Link to="/signIn" className="d-flex flex-column justify-content-center align-items-center ml-4 mr-4" ><img src="/img/icon/location.png" alt="" height="40" width="40" /><label className="text-center text-muted ">Location</label></Link></span>} </li>
                                    </ul>
                                </div>

                                <div className="Day-table mt-45">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Hour</th>
                                                <th scope="col">Day</th>
                                                <th scope="col">Monthly</th>
                                                <th scope="col">quarterly</th>
                                                <th scope="col">Yearly</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>₹{filterProduct.length === 0 ? <h2></h2> : filterProduct[0].hour_price - filterProduct[0].hour_price * filterProduct[0].discount / 100 <= 0 ? <span>NA</span> : filterProduct[0].hour_price - filterProduct[0].hour_price * filterProduct[0].discount / 100}</td>
                                                <td>₹ {filterProduct.length === 0 ? <h2></h2> : filterProduct[0].day_price - filterProduct[0].day_price * filterProduct[0].discount / 100 <= 0 ? <span>NA</span> : filterProduct[0].day_price - filterProduct[0].day_price * filterProduct[0].discount / 100}</td>
                                                <td>₹ {filterProduct.length === 0 ? <h2></h2> : filterProduct[0].month_price - filterProduct[0].month_price * filterProduct[0].discount / 100 <= 0 ? <span>NA</span> : filterProduct[0].month_price - filterProduct[0].month_price * filterProduct[0].discount / 100}</td>

                                                <td>₹ {filterProduct.length === 0 ? <h2></h2> : filterProduct[0].threemonth_price - filterProduct[0].threemonth_price * filterProduct[0].discount / 100 <= 0 ? <span>NA</span> : filterProduct[0].threemonth_price - filterProduct[0].threemonth_price * filterProduct[0].discount / 100}</td>

                                                <td>₹ {filterProduct.length === 0 ? <h2></h2> : filterProduct[0].yearly_price - filterProduct[0].yearly_price * filterProduct[0].discount / 100 <= 0 ? <span>NA</span> : filterProduct[0].yearly_price - filterProduct[0].yearly_price * filterProduct[0].discount / 100}</td>
                                            </tr>
                                            {/* <tr>
                                                <td className='lineBetween'>₹ {filterProduct.length === 0 ? <h2>₹</h2> : filterProduct[0].hour_price <= 0 ? <span>NA</span> : filterProduct[0].hour_price}</td>
                                                <td className='lineBetween'>₹ {filterProduct.length === 0 ? <h2>₹</h2> : filterProduct[0].day_price <= 0 ? <span>NA</span> : filterProduct[0].day_price}</td>
                                                <td className='lineBetween'>₹ {filterProduct.length === 0 ? <h2>₹</h2> : filterProduct[0].month_price <= 0 ? <span>NA</span> : filterProduct[0].month_price}</td>
                                                <td className='lineBetween'>₹ {filterProduct.length === 0 ? <h2>₹</h2> : filterProduct[0].threemonth_price <= 0 ? <span>NA</span> : filterProduct[0].threemonth_price}</td>
                                                <td className='lineBetween'>₹ {filterProduct.length === 0 ? <h2>₹</h2> : filterProduct[0].yearly_price <= 0 ? <span>NA</span> : filterProduct[0].yearly_price}</td>
                                            </tr> */}

                                        </tbody>
                                    </table>
                                    {
                                        filterProduct.length !== 0 && filterProduct[0].security_deposit && filterProduct[0].security_deposit!=='0'?<div className="delivery-heading pt-2 text-black">
                                        <h4>
                                            Security Deposit <p>₹ {filterProduct.length === 0 ? <h2>₹</h2> : filterProduct[0].security_deposit}</p>
                                        </h4>
                                    </div>:null}

                                    {
                                        toggle === 1 ? <div className="specification pt-4  pb-4">
                                            <h4>Specifications</h4>
                                            <div className="specification-table pt-4">
                                                <table className="table table-bordered">
                                                    <tbody>

                                                        <tr className='row m-0'>
                                                            {
                                                                fieldWithKey

                                                            }
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div> : <div></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row m-0'>
                <div className="col-lg-12 col-10 mb-3 mx-auto">
                    <h2 className="text-center">Key Specification of {filterProduct.length === 0 ? <span>Product Name</span> : filterProduct[0].product_name}</h2>
                    <div className="row mt-2" style={{ justifyContent: "center" }}>
                        <div className="col-lg-2 col-6">
                            <div class="card" style={{ width: "10rem", border: 'none', padding: '2rem' }}>
                                <img src={`${process.env.REACT_APP_IPURL}${filterCategory[0].icon1}`} class="card-img-top" alt="..." height="80px" width="80px" />
                                <h5 class="card-text text-center" style={{ marginTop: "10px" }}>{filterCategory[0].icon1Title}</h5>
                                <div class="card-body" style={{ padding: "0" }}>
                                    <p class="card-title text-center m-0">{filterProduct.length === 0 ? <span>Key</span> : filterProduct[0].minImage5}</p>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-6">
                            <div class="card" style={{ width: "10rem", border: 'none', padding: '2rem' }}>
                                <img src={`${process.env.REACT_APP_IPURL}${filterCategory[0].icon2}`} class="card-img-top" alt="..." height="80px" width="80px" />
                                <h5 class="card-text text-center" style={{ marginTop: "10px" }}>{filterCategory[0].icon2Title}</h5>
                                <div class="card-body m-0" style={{ padding: "0" }}>
                                    <p class="card-title text-center m-0">{filterProduct.length === 0 ? <span>Key</span> : filterProduct[0].minImage6}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-6">
                            <div class="card" style={{ width: "10rem", border: 'none', padding: '2rem' }}>
                                <img src={`${process.env.REACT_APP_IPURL}${filterCategory[0].icon3}`} class="card-img-top" alt="..." height="80px" width="80px" />
                                <h5 class="card-text text-center" style={{ marginTop: "10px" }}>{filterCategory[0].icon3Title}</h5>
                                <div class="card-body m-0" style={{ padding: "0" }}>
                                    <p class="card-title text-center m-0">{filterProduct.length === 0 ? <span>Key</span> : filterProduct[0].minImage7}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-6">
                            <div class="card" style={{ width: "10rem", border: 'none', padding: '2rem' }}>
                                <img src={`${process.env.REACT_APP_IPURL}${filterCategory[0].icon4}`} class="card-img-top" alt="..." height="80px" width="80px" />
                                <h5 class="card-text text-center" style={{ marginTop: "10px" }}>{filterCategory[0].icon4Title}</h5>
                                <div class="card-body m-0" style={{ padding: "0" }}>
                                    <p class="card-title text-center m-0">{filterProduct.length === 0 ? <span>Key</span> : filterProduct[0].minImage8}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-6">
                            <div class="card" style={{ width: "10rem", border: 'none', padding: '2rem' }}>
                                <img src={`${process.env.REACT_APP_IPURL}${filterCategory[0].icon5}`} class="card-img-top" alt="..." height="80px" width="80px" />
                                <h5 class="card-text text-center" style={{ marginTop: "10px" }}>{filterCategory[0].icon5Title}</h5>
                                <div class="card-body m-0" style={{ padding: "0" }}>
                                    <p class="card-title text-center m-0">{filterProduct.length === 0 ? <span>Key</span> : filterProduct[0].minImage9}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {fullFieldWithKey}
            </div>

            {/* FAQ START */}
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {toggle === 1 ? <><div>
                            <br />
                            <br />
                        </div>
                            <div className="faq">
                                <h4>Frequently asked questions</h4>
                                <div className="accordion">
                                    {
                                        fullFaqWithKey
                                    }
                                </div>
                            </div></> : <div></div>}
                    </div>
                </div>
            </div>
            {/* FAQ START END*/}

            <SimiliarProduct filter={filterCategory[0]?.id} />

            <Review product={product_id} />
            <div className='row m-0 '>
                <div className="col-10 mx-auto">
                    <h2 className="text-center">Review</h2>
                    <ReviewScreen product={filterProduct[0].id} />
                </div>
            </div>

            {/* MUI Alert Box */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"

            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className='location-size' style={{ height: "50vh", width: "77vw" }}>


                            {/* Google Map Box */}

                            {filterProduct[0].lat ? <GoogleMap
                                center={{ lat: parseFloat(filterProduct[0].lat), lng: parseFloat(filterProduct[0].log) }}
                                zoom={15}
                                mapContainerStyle={{ width: '100%', height: '100%' }}
                                options={{
                                    zoomControl: true,
                                    streetViewControl: true,
                                    mapTypeControl: true,
                                    fullscreenControl: true,
                                }}
                                onLoad={map => setMap(map)}
                            >
                                {map && <Marker position={{ lat: parseFloat(filterProduct[0].lat), lng: parseFloat(filterProduct[0].log) }} />}
                            </GoogleMap> : <h4>Location Not Found</h4>}
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>

                </DialogActions>
            </Dialog>

        </>
    )
}

export default Specification
