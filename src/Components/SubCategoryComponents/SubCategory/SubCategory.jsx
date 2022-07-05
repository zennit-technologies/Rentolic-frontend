import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { loadSubCategoryes } from '../../../Actions/SubCategoryAction';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { getSingleCategory } from '../../../Actions/categoryAction';
import { loadProducts } from '../../../Actions/productAction';
import Rateing from '../../Common/Rating/Rateing';
import { Rating } from '@mui/material';
import { addProductClick } from '../../../Actions/productClickAction';

const SubCategory = () => {
    // LOAD ACTIONS
    const { category_id } = useParams();
    let dispatch = useDispatch();
    const { subCategoryes } = useSelector(state => state.subCategoryData);
    const { category } = useSelector(state => state.categoryData);

    useEffect(() => {
        dispatch(loadSubCategoryes());
        dispatch(getSingleCategory(category_id));
    }, [category_id]);

    // LOAD ACTIONS
    const { products } = useSelector(state => state.productData);
    useEffect(() => {
        dispatch(loadProducts());
    }, []);
    // LOAD ACTIONS ENDS

    const filterSubCat = products.filter((curr) => {
        return curr.category_id == category_id;
    })
    // console.log(filterSubCat)
    // LOAD ACTIONS ENDS 
    return (
        <>
            {/* SUB CATEGORY BANNER */}
            <Carousel showThumbs={false}>
                <div>
                    <img src={`${process.env.REACT_APP_IPURL}${category.icon}`} />
                </div>
            </Carousel>

            {/* <!-- basic-blog-area --> */}

            <div className="basic-blog-area gray-bg pt-4 pb-4">
                <div className="container">
                    <div class="section-title"><h2>Rent By Category</h2></div>
                    <div className="row">
                        {filterSubCat &&
                            filterSubCat.map((products, i) => {
                                return (
                                    <div className="col-lg-3 col-md-6 blog-item  mb-4" >
                                        <Link to={`/product/${products.product_name}/${products.id}`} 
                                        onClick={() => dispatch(addProductClick([{ 'product_id': products.id }]))}>
                                            <div className="portfolio-thumb">
                                                <img src={`${process.env.REACT_APP_IPURL}${products.images}`} alt="" />
                                                <div className="btn-furniture weekly-product">
                                                    <h5>{products.product_name}</h5>
                                                    <small className="pb-1">from <span>₹ {products.hour_price ? `${products.hour_price}/Hour` : products.day_price ? `${products.day_price}/Day` : products.month_price ? `${products.month_price}/Month` : products.threemonth_price ? `${products.threemonth_price}/Quarterly` : products.yearly_price ? `${products.yearly_price}/Yearly` : 'Price'}</span></small>
                                                    <Rating name="read-only" value={products.avg_rating} readOnly />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>


                                );
                            })}
                    </div>
                </div>
            </div>
            {/* <!-- basic-blog-area end --> */}

        </>
    )
}

export default SubCategory
