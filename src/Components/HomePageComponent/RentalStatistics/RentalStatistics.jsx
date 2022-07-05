import React from 'react'

const RentalStatistics = () => {
    return (
        <>

            {/* <!-- counter-area start --> */}
            <div className="counter-area pt-4 pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="section-title text-center mb-50 service-text">
                                <h5>Rental Statistics</h5>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-4">
                            <div className="single-couter text-center mb-30">
                                <span className="lnr lnr-users black"></span>
                                <h5 className='bigFont'>Sessions on Site</h5>
                                <h5 className='bigFont black'>3512521</h5>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4">
                            <div className="single-couter text-center mb-30">
                                <span className="lnr lnr-thumbs-up black"></span>
                                <h5 className='bigFont'>Rented Days</h5>
                                <h5 className='bigFont black'>2541</h5>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4">
                            <div className="single-couter text-center mb-30">
                                <span className="lnr lnr-apartment black"></span>
                                <h5 className='bigFont'>Products Rented</h5>
                                <h5 className='bigFont black'>45687</h5>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* <!-- counter-area end --> */}
        </>
    )
}

export default RentalStatistics
