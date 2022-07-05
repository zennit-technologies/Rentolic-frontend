import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadTestis } from '../../../Actions/testiAction';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const ClientTestiPanel = () => {
    // LOAD ACTIONS
    let dispatch = useDispatch();
    const { testis } = useSelector(state => state.testiData);
    useEffect(() => {
        dispatch(loadTestis());
    }, []);
    // LOAD ACTIONS ENDS 
    return (
        <>
            {/* <!-- services-area start --> */}
            <div className="services-area pt-4 pb-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="section-title text-center service-text">
                                <h5>Customer Speak</h5>
                                <p>Who help us fly higher and bring out the best in us!</p>
                            </div>
                        </div>
                    </div>
                    <div className="row overFlowScroll">

                        <AutoplaySlider
                            play={true}
                            bullets={false}
                            cancelOnInteraction={false} // should stop playing on user interaction
                            interval={3000}
                        >
                            {testis &&
                                testis.map((testi, i) => {
                                    return (
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="service-wrapper text-center d-flex service-user">
                                                <div className='pr-4 col-lg-8 col-12'>
                                                    <h5>{testi.username}</h5>
                                                    <p style={{textAlign: "justify"}}>{testi.review}</p>
                                                </div>
                                                <img className='testi-img col-lg-4 col-12' src={`${process.env.REACT_APP_IPURL}${testi.image}`} alt="" />
                                            </div>
                                        </div>
                                    );
                                })}
                        </AutoplaySlider>
                    </div>
                </div>
            </div>
            {/* <!-- services-area start --> */}

        </>
    )
}

export default ClientTestiPanel
