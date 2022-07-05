import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { loadProducts } from '../../../Actions/productAction';
import { getSingleSubCategory } from '../../../Actions/SubCategoryAction';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { addProductClick } from '../../../Actions/productClickAction';
import Rateing from '../../Common/Rating/Rateing';
import Slider from '@mui/material/Slider';
import { Rating } from '@mui/material';




const Products = () => {
    // LOAD ACTIONS
    const [cityFilter, setCityFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState("");
    const { sub_category_id } = useParams();
    // console.log(sub_category_id)
    let dispatch = useDispatch();
    const { products } = useSelector(state => state.productData);
    const { subCategory } = useSelector(state => state.subCategoryData);
    const [filterProductList, setFilterProductList] = useState([]);
    const [price, setPrice] = useState('0 ₹');

    const valuetext = (value) => {
        return setPrice(`${value} ₹`);
    }

    const priceFilterChanger = (filtertype) => {
        if (priceFilter !== '') {
            if (filtertype === 'hour_price') {
                let data = filterProducts.filter((curr) => {
                    let dbPrice = parseInt(curr.hour_price)
                    let filPrice = parseInt(price)
                    // console.log(dbPrice)
                    // console.log(filPrice)
                    // console.log(cityFilter)
                    if (curr.city == cityFilter) {
                        if (dbPrice <= filPrice) {
                            return curr;
                        }
                    }
                })
                console.log(data)
                setFilterProductList(data)

            }
            else if (filtertype === 'day_price') {
                let data = filterProducts.filter((curr) => {
                    let dbPrice = parseInt(curr.day_price)
                    let filPrice = parseInt(price)
                    // console.log(dbPrice)
                    // console.log(filPrice)
                    // console.log(cityFilter)
                    if (curr.city == cityFilter) {
                        if (dbPrice <= filPrice) {
                            return curr;
                        }
                    }
                })
                console.log(data)
                setFilterProductList(data)

            }
            else if (filtertype === 'month_price') {
                let data = filterProducts.filter((curr) => {
                    let dbPrice = parseInt(curr.month_price)
                    let filPrice = parseInt(price)
                    // console.log(dbPrice)
                    // console.log(filPrice)
                    // console.log(cityFilter)
                    if (curr.city == cityFilter) {
                        if (dbPrice <= filPrice) {
                            return curr;
                        }
                    }
                })
                console.log(data)
                setFilterProductList(data)
            }
            if (filtertype === 'threemonth_price') {
                let data = filterProducts.filter((curr) => {
                    let dbPrice = parseInt(curr.threemonth_price)
                    let filPrice = parseInt(price)
                    // console.log(dbPrice)
                    // console.log(filPrice)
                    // console.log(cityFilter)
                    if (curr.city == cityFilter) {
                        if (dbPrice <= filPrice) {
                            return curr;
                        }
                    }
                })
                console.log(data)
                setFilterProductList(data)


            }
            else if (filtertype === 'yearly_price') {
                let data = filterProducts.filter((curr) => {
                    let dbPrice = parseInt(curr.yearly_price)
                    let filPrice = parseInt(price)
                    // console.log(dbPrice)
                    // console.log(filPrice)
                    // console.log(cityFilter)
                    if (curr.city == cityFilter) {
                        if (dbPrice <= filPrice) {
                            return curr;
                        }
                    }
                })
                setFilterProductList(data)
                console.log("Yearly", filterProductList)

            }
        }
        else {
            console.log('Please Select Filter Type')
        }
    }

    useEffect(() => {
        dispatch(loadProducts());
        dispatch(getSingleSubCategory(sub_category_id));
        setCityFilter(localStorage.getItem('city_id'))
    }, [sub_category_id]);

    let filterProducts = products.filter((curr) => {
        return curr.sub_category_id == sub_category_id;
    })
    // LOAD ACTIONS ENDS 

    // rating filter functionality
    const [rate, setRate] = useState('');

    const ratingFilterHandler = (e) => {
        setRate(e.target.value)
    }



    return (
        <>

            {/* SUB CATEGORY BANNER */}
            <Carousel showThumbs={false}>
                <div>
                    <img src={`${process.env.REACT_APP_IPURL}${subCategory.sub_cat_icon}`} />
                </div>
            </Carousel>


            {/* <!-- basic-blog-area --> */}
            <div className="basic-blog-area gray-bg pt-4 pb-4">
                <div className="container">

                    <div className="row">

                        {/*  Product Filter Box */}
                        <div className="col-lg-3 col-md-6 col-sm-12 blog-item  mb-4" >
                            <div className="blog-wrapper blog-columSubCategoryox">
                                <h3>Filter</h3>
                                <h6 className="text-primary">Price Range :-  {price}</h6>
                                <div className="row">
                                    <div className="col-12">
                                        <select name="sub_category_id" id="" className="form-control" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                                            <option value="">Type</option>
                                            <option value="hour_price">Hour</option>
                                            <option value="day_price">Day</option>
                                            <option value="month_price">Month</option>
                                            <option value="threemonth_price">Quartely</option>
                                            <option value="yearly_price">Yearly</option>
                                        </select>
                                    </div>
                                    <div className="col-12">

                                        <Slider
                                            aria-label="Temperature"
                                            defaultValue={0}
                                            getAriaValueText={valuetext}
                                            valueLabelDisplay="auto"
                                            step={1000}
                                            marks
                                            min={0}
                                            max={10000}
                                            onClick={() => priceFilterChanger(priceFilter)}
                                        />
                                        <h6 className="text-primary mt-4">Rating Filter</h6>
                                        <Rating name="read-only" value={rate} onChange={ratingFilterHandler} />
                                    </div>
                                    {price !== '0 ₹' && priceFilter !== '' || rate !== '' ? <div className="col-12 d-flex justify-content-center mt-3">
                                        <button className="link-box text-white" onClick={() => { setPriceFilter(""); setPrice('0 ₹'); setRate('') }}>
                                            Clear
                                        </button>
                                    </div> : null}
                                </div>

                            </div>
                        </div>

                        {rate === '' ? priceFilter === '' ? !cityFilter ? filterProducts &&
                            filterProducts.map((product, i) => {
                                return (
                                    <div className="col-lg-3 col-md-6 col-sm-12 blog-item  mb-4" >
                                        <Link to={`/product/${product.product_name}/${product.id}`} onClick={() => dispatch(addProductClick([{ 'product_id': product.id }]))}>
                                            <div className="portfolio-thumb">
                                                <img src={`${process.env.REACT_APP_IPURL}${product.images}`} alt="" />
                                                <div className="btn-furniture weekly-product">
                                                    <h5>{product.product_name}</h5>
                                                    <small>from <span>₹ {product.hour_price ? `${product.hour_price}/Hour` : product.day_price ? `${product.day_price}/Day` : product.month_price ? `${product.month_price}/Month` : product.threemonth_price ? `${product.threemonth_price}/Quarterly` : product.yearly_price ? `${product.yearly_price}/Yearly` : 'Price'}</span></small>
                                                    <Rating name="read-only" value={product.avg_rating} readOnly />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            }) : filterProducts.filter(curr => curr.city == cityFilter).length === 0 ? <h4>Products Not Found in this location</h4>
                            : filterProducts.filter(curr => curr.city == cityFilter).map((product) => {
                                return <div className="col-lg-3 col-md-6 blog-item  mb-4 col-12" >
                                    <Link to={`/product/${product.product_name}/${product.id}`} onClick={() => dispatch(addProductClick([{ 'product_id': product.id }]))} >
                                        <div className="portfolio-thumb">
                                            <img src={`${process.env.REACT_APP_IPURL}${product.images}`} alt="" />
                                            <div className="btn-furniture weekly-product">
                                                <h5>{product.product_name}</h5>
                                                <small>from <span>₹ {product.hour_price ? `${product.hour_price}/Hour` : product.day_price ? `${product.day_price}/Day` : product.month_price ? `${product.month_price}/Month` : product.threemonth_price ? `${product.threemonth_price}/Quarterly` : product.yearly_price ? `${product.yearly_price}/Yearly` : 'Price'}</span></small>
                                                <Rating name="read-only" value={product.avg_rating} readOnly />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            }) : filterProductList.length !== 0 ? filterProductList.map((product) => {
                                return <div className="col-lg-3 col-md-6 blog-item  mb-4 col-12" >
                                    <Link to={`/product/${product.product_name}/${product.id}`} onClick={() => dispatch(addProductClick([{ 'product_id': product.id }]))} >
                                        <div className="portfolio-thumb">
                                            <img src={`${process.env.REACT_APP_IPURL}${product.images}`} alt="" />
                                            <div className="btn-furniture weekly-product">
                                                <h5 className="text-white">{product.product_name}</h5>
                                                <small>from <span>₹ {product.hour_price ? `${product.hour_price}/Hour` : product.day_price ? `${product.day_price}/Day` : product.month_price ? `${product.month_price}/Month` : product.threemonth_price ? `${product.threemonth_price}/Quarterly` : product.yearly_price ? `${product.yearly_price}/Yearly` : 'Price'}</span></small>
                                                {/* <Rateing
                                                        value={product.avg_rating}
                                                        // text={product.numReviews + ' reviews'}
                                                    /> */}
                                                <Rating name="read-only" value={product.avg_rating} readOnly />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            }) : <h4>Products Not Found</h4> : filterProducts.filter(data => data.avg_rating == rate).length === 0 ? <h4>No Product Found</h4> : filterProducts.filter(data => data.avg_rating == rate).map((product, i) => {
                                return (
                                    <div className="col-lg-3 col-md-6 col-sm-12 blog-item  mb-4" >
                                        <Link to={`/product/${product.product_name}/${product.id}`} onClick={() => dispatch(addProductClick([{ 'product_id': product.id }]))}>
                                            <div className="portfolio-thumb">
                                                <img src={`${process.env.REACT_APP_IPURL}${product.images}`} alt="" />
                                                <div className="btn-furniture weekly-product">
                                                    <h5>{product.product_name}</h5>
                                                    <small>from <span>₹ {product.hour_price ? `${product.hour_price}/Hour` : product.day_price ? `${product.day_price}/Day` : product.month_price ? `${product.month_price}/Month` : product.threemonth_price ? `${product.threemonth_price}/Quarterly` : product.yearly_price ? `${product.yearly_price}/Yearly` : 'Price'}</span></small>
                                                    <Rating name="read-only" value={product.avg_rating} readOnly />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })

                        }
                    </div>
                </div>
            </div >
            {/* <!-- basic-blog-area end --> */}

        </>
    )
}

export default Products
