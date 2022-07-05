import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadTerms } from '../../Actions/termsAction';

const TermsComponent = () => {
    // LOAD ACTIONS
    let dispatch = useDispatch();
    const { terms } = useSelector(state => state.termsData);
    useEffect(() => {
        dispatch(loadTerms());
    }, []);
    // LOAD ACTIONS ENDS

    return (
        <>
            <section id="policy" class="paddingtotop">
                <div className="container">
                    <div class="section-title">
                        <h2>Terms & Conditions</h2>
                    </div>
                    <div className="col-lg-12 col-sm-12 paddingtobot">
                        <div className="row">
                            <div className="col-lg-10">
                                {terms &&
                                    terms.map((term, i) => {
                                        return (
                                            <div className="policy">
                                                <div className="title">
                                                    <h2>
                                                        {term.title}
                                                    </h2>
                                                </div>
                                                <div className="policy">
                                                    <p>
                                                        {term.content}
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

export default TermsComponent