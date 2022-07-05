import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadContacts } from '../../../Actions/ContactWebSite';


const Footer = () => {
    // LOAD ACTIONS
    let dispatch = useDispatch();
    const { contacts } = useSelector(state => state.ContactWebSiteData);
    useEffect(() => {
        dispatch(loadContacts());
    }, []);
    // LOAD ACTIONS ENDS
    return (
        <>
            {/* <!-- footer start --> */}
            <footer class="white-bg">

                <div class="widget-area">
                    <div class="container">
                        <div class="row" style={{paddingTop: "4rem"}}>
                            <div class="col-xl-4 col-lg-5 col-md-3 mb-30">
                                <div class="footer-widget">
                                    <h3>Other Links</h3>
                                    <ul class="footer-link">
                                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                        <li><Link to="/terms-&-condition"> Terms & Condition</Link></li>
                                        <li><Link to="/request-category">Request Category</Link></li>
                                        <li><Link to="/request-subcategory">Request Sub-Category</Link></li>
                                        <li><Link to="/request-city">Request City</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-5 col-md-3 mb-30">
                                <div class="footer-widget">
                                    <h3>Affiliates</h3>
                                    <ul class="footer-link">
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/about-us">About Us</Link></li>
                                        {/* <li><Link to="#">Our Services</Link></li> */}
                                        <li><Link to="/contact-us">Contact Us</Link></li>
                                        <li><Link to="/blogs">Blogs</Link></li>

                                    </ul>
                                </div>
                            </div>
                            {contacts &&
                                contacts.map((contact, i) => {
                                    return (
                                        <div class="col-xl-4 col-lg-4 col-md-5 mb-30">
                                            <div class="footer-widget ">
                                                <h3>Contact Us</h3>
                                                <ul class="footer-info">
                                                    <li>{contact.address}</li>
                                                    <li><a href={`mailto:${contact.gmail}`}>{contact.gmail}</a></li>
                                                    <li><a href={`tel:${contact.phone}`}>Call Us On +91 {contact.phone}</a></li>
                                                </ul>
                                            </div>
                                            <div class="social-icon f-left d-none d-md-block">
                                                <a href={contact.facebook} target="_blank">
                                                    <i class="fab fa-facebook-f"></i>
                                                </a>
                                                <a href={contact.twitter} target="_blank">
                                                    <i class="fab fa-twitter"></i>
                                                </a>
                                                <a href={contact.linkedin} target="_blank">
                                                    <i class="fab fa-linkedin"></i>
                                                </a>
                                                <a href={contact.instagram} target="_blank">
                                                    <i class="fab fa-instagram"></i>
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
                <div class="copyright-area pt-25 pb-25">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12 col-md-12">
                                <div class="copyright-text text-center text-lg-center">
                                    <p>Copyright ©2022 rentolic. All Rights Reserved</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
            {/* <!-- footer end --> */}
        </>
    )
}

export default Footer
