import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { loadSliders } from '../../../Actions/sliderAction';

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
                            <div className='maxHeight'>
                                <img className='maxHeight' style={{ height: "500px" }} src={`${process.env.REACT_APP_IPURL}${slider.image}`} />

                                {/* <p className="legend">{slider.title}</p> */}
                            </div>
                        );
                    })}
            </Carousel>
            {/* <!-- slider end --> */}
        </>
    )
}

export default Slider
