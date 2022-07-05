import { Rating } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadProducts } from '../../../Actions/productAction';
import { addProductClick } from '../../../Actions/productClickAction';
import Rateing from '../../Common/Rating/Rateing';


const SimiliarProduct = ({ filter }) => {
    console.log(filter)
    const { products } = useSelector(state => state.productData);
    let dispatch = useDispatch();

    const filterProducts = products?.filter((cur) => cur.category_id === filter).sort((a, b) => 0.5 - Math.random());

    useEffect(() => {
        dispatch(loadProducts());
    }, [filter]);
    return (
        <>
            <div className="section-title text-center mb-0" style={{ paddingTop: "30px" }}>
                <h2>Similar Products</h2>
            </div>
            <div className="row m-0">

                <div className="col-xl-12">
                    {filterProducts && filterProducts.map((product) => {
                        return <div className="col-lg-3 col-md-6 blog-item  mb-4">
                            <Link to={`/product/${product.product_name}/${product.id}`} onClick={() => dispatch(addProductClick([{ 'product_id': product.id }]))}>
                                <div className="portfolio-thumb">
                                    <img src={`${process.env.REACT_APP_IPURL}${product.images}`} alt="" />
                                    <div className="btn-furniture weekly-product">
                                        <h5>{product.product_name}</h5>
                                        <small className="pb-1">from <span>₹ {product.hour_price ? `${product.hour_price}/Hour` : product.day_price ? `${product.day_price}/Day` : product.month_price ? `${product.month_price}/Month` : product.threemonth_price ? `${product.threemonth_price}/Quarterly` : product.yearly_price ? `${product.yearly_price}/Yearly` : 'Price'}</span></small>
                                        {/* <Rateing
                                            value={product.avg_rating}
                                        // text={product.numReviews + ' reviews'}
                                        /> */}
                                        <Rating name="read-only" value={product.avg_rating} readOnly />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default SimiliarProduct
