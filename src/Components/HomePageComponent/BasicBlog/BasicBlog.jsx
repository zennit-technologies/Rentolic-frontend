import React from 'react'
import { Link } from 'react-router-dom'

const BasicBlog = () => {
    return (
        <>
            {/* <!-- basic-blog-area --> */}
            <div className="basic-blog-area gray-bg pt-4 pb-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="section-title text-center mb-50">
                                <h5>Top Rental Picks of the Week.What's Yours?</h5>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 blog-item mb-40">
                            <div className="blog-wrapper blog-column">
                                <div className="blog-thumb">
                                    <Link to="blog-details.html">
                                        <img src="img/bg/bike.png" alt="" />
                                    </Link>
                                </div>
                                <div className="link-box  text-center">
                                    <Link to="blog-details.html">IN BIKES</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 blog-item mb-40">
                            <div className="blog-wrapper blog-column">
                                <div className="blog-thumb">
                                    <Link to="blog-details.html">
                                        <img src="img/bg/chair.png" alt="" />
                                    </Link>
                                </div>
                                <div className="link-box text-center">
                                    <Link to="blog-details.html">IN BIKES</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 blog-item mb-40">
                            <div className="blog-wrapper blog-column">
                                <div className="blog-thumb">
                                    <Link to="blog-details.html">
                                        <img src="img/bg/beg.png" alt="" />
                                    </Link>
                                </div>
                                <div className="link-box text-center">
                                    <Link to="blog-details.html">IN BIKES</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 blog-item mb-40">
                            <div className="blog-wrapper blog-column">
                                <div className="blog-thumb">
                                    <Link To="blog-details.html">
                                        <img src="img/bg/ac.png" alt="" />
                                    </Link>
                                </div>
                                <div className="link-box text-center">
                                    <Link to="blog-details.html">IN BIKES</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- basic-blog-area end --> */}
        </>
    )
}

export default BasicBlog
