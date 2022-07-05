import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadAbouts } from '../../Actions/aboutUsAction';

const AboutUsComponent = () => {

    // LOAD ACTIONS
    let dispatch = useDispatch();
    const { abouts } = useSelector(state => state.aboutData);
    useEffect(() => {
        dispatch(loadAbouts());
    }, []);
    // LOAD ACTIONS ENDS

    return (
        <>
            <section className='paddingtotop'>
                <div className="container">
                    <div className="col-lg-12">
                            <div class="section-title"><h2>About us</h2></div>
                        <div className="row">
                            <div className="col-lg-10 paddingtobot">
                                <div className="contect"> 
                                    {abouts &&
                                        abouts.map((about, i) => {
                                            return (
                                                <p className="about_content">
                                                    {about.about_us}
                                                </p>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutUsComponent