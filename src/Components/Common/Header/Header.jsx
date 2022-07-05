import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { loadCategoryes } from '../../../Actions/categoryAction'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useUserAuth } from "../../../context/UserAuthContext";
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { loadSubCategoryes } from '../../../Actions/SubCategoryAction';
import LocationPanel from './LocationPanel';
import minLogo from '../../../imgs/logos/Iconlogo.png';
import ViewAll from './ViewAll';
import { loadContacts } from '../../../Actions/ContactWebSite';
import newLogo from './Rentolic Logo Min.png'

// import 
const Header = () => {
    const [accord, setAccord] = useState(1);

    const { logOut, user } = useUserAuth();
    const fullName = localStorage.getItem('fullname');
    const [data, setData] = useState({ cat: "", subcat: "" });
    const username = localStorage.getItem('fullname');
    const [searchData, setSearchData] = useState('');
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // LOAD ACTIONS
    let dispatch = useDispatch();
    const { categoryes } = useSelector(state => state.categoryData);
    useEffect(() => {
        dispatch(loadCategoryes());
    }, []);

    const { subCategoryes } = useSelector(state => state.subCategoryData);
    useEffect(() => {
        dispatch(loadSubCategoryes());
    }, []);

    const { contacts } = useSelector(state => state.ContactWebSiteData);
    useEffect(() => {
        dispatch(loadContacts());
    }, []);
    // LOAD ACTIONS ENDS

    const handleLogout = async () => {
        try {
            await logOut();
            localStorage.removeItem("user");
            localStorage.removeItem("id");
            localStorage.removeItem("fullname");
            localStorage.removeItem("token");
            localStorage.removeItem("phone");
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };

    const searchClick = () => {

        if (searchData !== '') {
            navigate(`/search/${searchData}`)
        }
        else {
            console.log('Please enter data');
        }
    }

    const searchEnter = (e) => {
        if (e.keyCode === 13) {
            if (searchData !== '') {
                navigate(`/search/${searchData}`)
            }
            else {
                console.log('Please enter data');
            }
        }
    }


    return (
        <>
            {/* <!-- header start --> */}
            <header className="transparent-header">
                <div className="header-top-area top-space">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-xl-2 col-lg-2 col-md-2 col-12">
                                <div className="row" style={{ alignItems: "center" }}>
                                    <div className="col-xl-8 col-lg-8 col-md-8 col-8">
                                        <div className="header-call text-center text-md-left">
                                            <div className="logo buy-logo">
                                                <Link to="/">
                                                    <img src={newLogo} alt="" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-4 col-md-4 d-flex justify-content-center">
                                        <LocationPanel />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-7 col-lg-7 col-md-7 col-12 d-flex align-items-center justify-content-end">
                                <div className="input-group input-search">
                                    <input type="search" className="form-control rounded"
                                        placeholder="Search for products,brands & more you want to rent" aria-label="Search"
                                        aria-describedby="search-addon" value={searchData} onChange={(e) => setSearchData(e.target.value)} onKeyDown={searchEnter} />
                                    <button type="button" className="btn btn-outline-primary" onClick={searchClick}>Search</button>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-3 col-12 d-flex align-items-center justify-content-center">

                                <Link to="/post-ad" className='mr-3'><button className="glow-on-hover" type="button">Sell</button></Link>

                                {/* <div className="social-icon f-left d-md-block p-0"> */}
                                {
                                    !fullName ? <Link to="/signIn" className='mr-3'><button className="glow-on-hover" type="button">Login</button> </Link>
                                        : <div>
                                            <IconButton
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                <h6 className="text-light username">{username}</h6><AccountCircle />
                                            </IconButton>

                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <Link to="/view-my-ad"><MenuItem onClick={handleClose}>View-my-ad</MenuItem></Link>
                                                <Link to="/profile"><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
                                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                            </Menu>
                                        </div>
                                }
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* NAVBAR START */}
                <div className="header-bottom-area">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-12 col-lg-12">
                                {/* <div className="row"> */}
                                <div className="main-menu f-left">
                                    <nav id="mobile-menu navResponsive">
                                        <ul className='navResponsive'>
                                            <ViewAll />
                                            {categoryes &&
                                                categoryes.filter((val) => val.status === 1).map((category, i) => {
                                                    return (
                                                        <li className='navTextTranform' style={{ position: "relative" }}>
                                                            <Link to={`/category/${category.category_name}/${category.id}`}>{category.category_name}</Link>
                                                            <ul className="submenu" style={{ position: "absolute" }}>
                                                                {subCategoryes && subCategoryes.filter((val) => {
                                                                    return val.category_id == category.id;
                                                                }).map((val) => {
                                                                    return <li> <Link to={`/sub-category/${val.name}/${val.id}`}>{val.name}</Link>
                                                                    </li>
                                                                })
                                                                }
                                                            </ul>
                                                        </li>
                                                    );
                                                }).slice([0], [6])}
                                        </ul>
                                    </nav>
                                </div>
                                <div className="header-text f-right d-lg-block business-header">
                                    <Link to="/" className="header-rentol">Rentolic for Business</Link>
                                    {contacts &&
                                        contacts.map((contact, i) => {
                                            return (
                                                <a href={`tel:${contact.phone}`} style={{color: "white"}}> +91 {contact.phone}</a>
                                            );
                                        })}
                                </div>
                                {/* <div className="mobile-menu"></div> */}
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* NAVBAR CLOSE */}
            </header>
            {/* <!-- header end --> */}
        </>
    )
}

export default Header
