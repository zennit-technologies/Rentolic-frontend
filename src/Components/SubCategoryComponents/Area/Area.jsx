import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom'
import { loadAds } from '../../../Actions/adsAction';

const Area = () => {
    // LOAD ACTIONS
    let dispatch = useDispatch();
    const { ads } = useSelector(state => state.adData);
    useEffect(() => {
        dispatch(loadAds());
    }, []);
    // LOAD ACTIONS ENDS
    return (
        <>
            {/* <Carousel
                showThumbs={false}
                infiniteLoop
                // transitionTime={6000}
                autoPlay
            >
                {ads &&
                    ads.map((state, i) => {
                        return (
                            <a href={state.buttonText}>
                                <div className='maxHeight'  style={{ height: "300px" }} >
                                    <img className='maxHeight' style={{ height: "300px" }} src={`${process.env.REACT_APP_IPURL}${state.icon}`} />
                                </div>
                            </a>
                        );
                    })}
            </Carousel>

            <h1>hiiii</h1> */}
        </>
    )
}

export default Area
