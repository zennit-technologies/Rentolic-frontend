import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadCategoryes } from '../../../Actions/categoryAction';
import { addProductClick } from '../../../Actions/productClickAction';
import { loadSubCategoryes } from '../../../Actions/SubCategoryAction';

const AllCategoryPanel = () => {
    // LOAD ACTIONS
    let dispatch = useDispatch();
    const { categoryes } = useSelector(state => state.categoryData);
    useEffect(() => {
        dispatch(loadCategoryes());
    }, []);
    
    const { subCategoryes } = useSelector(state => state.subCategoryData);
    useEffect(() => {
        dispatch(loadSubCategoryes());
    }, []);
    // LOAD ACTIONS ENDS 
    return (
        <>
            {/* <!-- portfolio-area start --> */}
            {categoryes &&
                categoryes.filter((val) => val.status === 1).map((category, i) => {
                    return (
                        <div className="portfolio-area pt-4 pb-4">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6 offset-lg-3">
                                        <div className="section-title text-center">
                                            <h5>Rent by {category.category_name}</h5>

                                        </div>
                                    </div>
                                </div>
                                <div className="row grid overFlowScroll">
                                    {
                                        subCategoryes && subCategoryes.filter((val) => {
                                            return val.category_id == category.id;
                                        }).map((val) => {
                                            return <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 grid-item Entertainment Electronics Furniture">
                                                <Link to={`/sub-category/${val.name}/${val.id}`} className="portfolio-wrapper mb-30" onClick={() => dispatch(addProductClick([{ 'product_id': val.id }]))}>
                                                    <div className="portfolio-thumb">
                                                        <img src={`${process.env.REACT_APP_IPURL}${val.sub_cat_image}`} alt="" />
                                                        <div className="btn-furniture text-center ">
                                                            <Link to={`/category/${val.name}/${val.id}`} className="button-bike curser">In {val.name}</Link>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>

                                        })
                                    }
                                </div>


                            </div>
                        </div>
                    );
                })}
            {/* <!-- portfolio-area end --> */}
        </>
    )
}

export default AllCategoryPanel
