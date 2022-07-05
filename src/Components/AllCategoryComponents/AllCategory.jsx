import { Rating } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadCategoryes } from '../../Actions/categoryAction';
import Rateing from '../Common/Rating/Rateing';

const AllCategory = () => {
    // LOAD ACTIONS
    let dispatch = useDispatch();
    const { categoryes } = useSelector(state => state.categoryData);
    useEffect(() => {
        dispatch(loadCategoryes());
    }, []);
    return (
        <>
            <div className="portfolio-area pt-4 pb-4">
                <div className="container">
                    <div className="row">
                        {categoryes &&
                            categoryes.map((val, i) => {
                                return (
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 grid-item Entertainment Electronics Furniture allCategory">
                                        <Link to={`/sub-category/${val.category_name}/${val.id}`} className="portfolio-wrapper mb-30">
                                            <div className="portfolio-thumb">
                                                <img src={`${process.env.REACT_APP_IPURL}${val.sub_cat_image}`}  alt={val.category_name} style={{ height: "250px" }} className="maxHeight" />
                                                <div className="btn-furniture weekly-product"
                                                    style={{ paddingTop: "3rem !important" }}>
                                                    <Link to={`/category/${val.name}/${val.id}`} className="button-bike curser " >In {val.category_name}</Link>
                                                    {/* <Rateing
                                                        value={val.avg_rating}
                                                        // text={product.numReviews + ' reviews'}
                                                    /> */}
                                                    <Rating name="read-only" value={val.avg_rating} readOnly />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllCategory