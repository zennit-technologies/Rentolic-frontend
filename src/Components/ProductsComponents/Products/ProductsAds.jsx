import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import { loadProducts } from '../../../Actions/productAction';
import { getSingleSubCategory } from '../../../Actions/SubCategoryAction';
import { getSingleAdSubCategory, loadAdSubCategorys } from '../../../Actions/subCategoryAdsAction';


const ProductsAds = () => {
    const { sub_category_id } = useParams();

    let dispatch = useDispatch();
    const { products } = useSelector(state => state.productData);
    const { adsSubCategorys } = useSelector(state => state.subCategoryAdsData);

    useEffect(() => {
        dispatch(loadProducts());
        dispatch(getSingleSubCategory(sub_category_id));
    }, [sub_category_id]);

    useEffect(() => {
        dispatch(loadAdSubCategorys());
        dispatch(getSingleAdSubCategory(sub_category_id));
    }, [sub_category_id]);

    // CHECKING THE SAME ID IN CATEGORY AND ADS
    let filterAdCat = adsSubCategorys.filter((curr) => {
        return curr.sub_category_id == sub_category_id;
    })
    // LOAD ACTIONS ENDS
    return (
        <>
            {/* SUB CATEGORY BANNER */}
            <Carousel
                showThumbs={false}
                infiniteLoop
                autoPlay>
                {filterAdCat &&
                    filterAdCat.map((state, i) => {
                        return (
                            <a href={state.link}>
                                <div className='maxHeight' style={{ height: "400px" }} >
                                    <img className='maxHeight' style={{ height: "400px" }} src={`${process.env.REACT_APP_IPURL}${state.icon}`} />
                                </div>
                            </a>
                        );
                    })}
            </Carousel>
        </>
    )
}

export default ProductsAds