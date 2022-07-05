import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadBlogs } from '../../Actions/blogAction';
import './blog.css'

const BlogComponents = () => {

    // LOAD ACTIONS
    let dispatch = useDispatch();
    const { blogs } = useSelector(state => state.blogData);
    useEffect(() => {
        dispatch(loadBlogs());
    }, []);
    // LOAD ACTIONS ENDS

    const MAX_LENGTH = 25;

    return (
        <>
            <section id="blog">
                <div className="container">
                    <div className="col-lg-12 paddingtobot">
                        <div className="row">
                            {blogs &&
                                blogs.map((blog, i) => {
                                    return (
                                        <div className="col-lg-4">
                                            <div className="blog">
                                                <div className="img">
                                                    <img src={`${process.env.REACT_APP_IPURL}${blog.image2}`}  alt="" className='img-fluid objectFit' />
                                                </div>
                                                <div className="title">
                                                    <h2 className="titleMain">
                                                    {blog.blog_title}
                                                    </h2>
                                                </div>
                                                <div className="dec">
                                                    <p className="decripction">
                                                        {blog.degisation}
                                                    </p>
                                                </div>
                                                <div className="name">
                                                    <h5 className="aythername">
                                                       Auther : {blog.name} 
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BlogComponents