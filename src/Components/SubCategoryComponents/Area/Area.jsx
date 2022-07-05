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
            {/* <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    {ads &&
                        ads.map((state, i) => {
                            return (
                                <div class="carousel-item active">
                                    <img class="d-block w-100"
                                        src={`${process.env.REACT_APP_IPURL}${state.icon}`} alt="First slide" />
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>{state.adName}</h5>
                                        <p>{state.subtitle}</p>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div> */}

            <Carousel
                showThumbs={false}
                infiniteLoop
                // transitionTime={6000}
                // autoPlay
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
        </>
    )
}

export default Area
