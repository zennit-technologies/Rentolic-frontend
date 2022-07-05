import React from 'react'
import { Link } from 'react-router-dom'

const Introo = () => {
  return (
    // <!-- intro-area start -->
        <div className="intro-area pt-4 pb-0">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="intro-text text-center text-white">
                            <h3>Switch from Buy to rentolic</h3><br/>
                            <Link to="" className="chat-us ">chat with us</Link>
                            <div className="buy-logo-img">
                                <img src="/img/bg/frentolic.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Introo
