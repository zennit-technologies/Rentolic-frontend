import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { loadProducts } from '../../Actions/productAction';
import { addProductClick } from '../../Actions/productClickAction';

const SearchProduct = () => {
    let {data}=useParams();
    console.log(data);
    let dispatch = useDispatch();
    const { products } = useSelector(state => state.productData);
    console.log(products)
    // const [filterProducts,setFilterProducts]=useState();
    const filterProducts=products.filter((val)=>{
        if(val.product_name.toLowerCase().includes(data.toLowerCase()) 
        || val.brand_name.toLowerCase().includes(data.toLowerCase())  
        || val.category_name.toLowerCase().includes(data.toLowerCase()) 
        || val.name.toLowerCase().includes(data.toLowerCase()) 
        )
        {
            return val;
        }
    })

    useEffect(() => {
        dispatch(loadProducts());
        
    }, []);

    console.log(filterProducts)

   



    return (
        <>
            <div className="portfolio-area pt-4 pb-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="section-title text-center mb-50">
                                <h2>Products</h2>

                            </div>
                        </div>
                    </div>

                    <div className="row grid overFlowScroll">
                        {
                            filterProducts.length===0? <div className="col-lg-12">
                            <div className="section-title text-center">
                                <h3>{`Ooops ! ${data} Not Found`}</h3>

                            </div>
                        </div>:filterProducts.map(filPro => {
                                return (
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 grid-item Entertainment Electronics Furniture" key={filPro.id}>
                                        <Link to={`/product/${filPro.product_name}/${filPro.id}`} className="portfolio-wrapper mb-30" onClick={() => dispatch(addProductClick([{ 'product_id': filPro.id }]))}>
                                            <div className="portfolio-thumb">
                                                <img src={`${process.env.REACT_APP_IPURL}${filPro.images}`} alt="" />
                                                <div className="btn-furniture text-center ">
                                                    <Link to={`/product/${filPro.product_name}/${filPro.id}`} className="button-bike curser" onClick={() => dispatch(addProductClick([{ 'product_id': filPro.id }]))}> {filPro.product_name}</Link>
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
        </>
    )
}

export default SearchProduct
