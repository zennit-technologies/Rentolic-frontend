import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { loadSliders } from '../../../Actions/sliderAction';
import { Link } from 'react-router-dom';

const Slider = () => {

    // LOAD ACTIONS
    let dispatch = useDispatch();
    const { sliders } = useSelector(state => state.sliderData);
    useEffect(() => {
        dispatch(loadSliders());
    }, []);
    // LOAD ACTIONS ENDS

    return (
        <>
            {/* <!-- slider start --> */}
            <Carousel
                showThumbs={false} 
                infiniteLoop
                transitionTime={1000}
                autoPlay
            >
                {sliders &&
                    sliders.map((slider, i) => {
                        return (
                            <a href={slider.title}>
                                <div className='maxHeight'>
                                    <img className='maxHeight' style={{ height: "500px" }} src={`${process.env.REACT_APP_IPURL}${slider.image}`} />
                                </div>
                            </a>
                        );
                    })}
            </Carousel>
            {/* <!-- slider end --> */}
        </>
    )
}

export default Slider
