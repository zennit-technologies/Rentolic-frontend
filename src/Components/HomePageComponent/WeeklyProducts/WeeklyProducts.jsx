// import { Rating } from '@mui/material';
import { Rating } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { addProductClick } from '../../../Actions/productClickAction'
import Rateing from '../../Common/Rating/Rateing';

const WeeklyProducts = () => {

    // WEEKLY PRODUCTS
    let dispatch = useDispatch();
    const [weeklyProducts, setWeeklyProduct] = useState([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_IPURL}/api/admin/weekly_products`).then((res) => {
            // console.log(res)
            return res.json()
        })
            .then((res) => {
                // console.log('Success', res)
                setWeeklyProduct(res)
                return res
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
            {/* <!-- portfolio-area start --> */}
            <div className="portfolio-area pt-4 pb-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="section-title text-center">
                                <h5>Top Rental Picks of the Week. What’s yours?</h5>

                            </div>
                        </div>
                    </div>

                    <div className="row grid overFlowScroll overFlowScrollWeek">
                        {
                            weeklyProducts.map(weeklyProduct => {
                                return (
                                    
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 grid-item Entertainment Electronics Furniture mb-4">
                                        <Link to={`/product/${weeklyProduct.product_name}/${weeklyProduct.id}`} className="portfolio-wrapper mb-30"
                                            onClick={() => dispatch(addProductClick([{ 'product_id': weeklyProduct.id }]))}
                                        >
                                            <div className="portfolio-thumb">
                                                <img src={`${process.env.REACT_APP_IPURL}${weeklyProduct.images}`} alt="" />
                                                <div className="btn-furniture weekly-product">
                                                    <h5> {weeklyProduct.product_name} </h5>
                                                    <small className="pb-1">from <span>₹ {weeklyProduct.hour_price ? `${weeklyProduct.hour_price}/Hour` : weeklyProduct.day_price ? `${weeklyProduct.day_price}/Day` : weeklyProduct.month_price ? `${weeklyProduct.month_price}/Month` : weeklyProduct.threemonth_price ? `${weeklyProduct.threemonth_price}/Quarterly` : weeklyProduct.yearly_price ? `${weeklyProduct.yearly_price}/Yearly` : 'Price'}</span></small>
                                                    <Rating name="read-only" value={weeklyProduct.avg_rating} readOnly />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            {/* <!-- portfolio-area end --> */}
        </>
    )
}

export default WeeklyProducts
