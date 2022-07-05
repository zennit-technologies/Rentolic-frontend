import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadPrivacys } from '../../Actions/privacyAction';

const PrivacyPolicyComponents = () => {
    // LOAD ACTIONS
    let dispatch = useDispatch();
    const { privacys } = useSelector(state => state.privacyData);
    useEffect(() => {
        dispatch(loadPrivacys());
    }, []);
    // LOAD ACTIONS ENDS
    return (
        <>
            <section id="policy" class="paddingtotop">
                <div className="container">
                    <div class="section-title">
                        <h2>Privacy Policy</h2>
                    </div>
                    <div className="col-lg-12 col-sm-12 paddingtobot">
                        <div className="row">
                            <div className="col-lg-10">
                                {privacys &&
                                    privacys.map((privacy, i) => {
                                        return (
                                            <div className="policy">
                                                <div className="title">
                                                    <h2>
                                                      {privacy.title}
                                                    </h2>
                                                </div>
                                                <div className="policy">
                                                    <p>
                                                        {privacy.content} 
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PrivacyPolicyComponents