import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadCitys } from '../../../Actions/cityAction';

// MUI Import
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const LocationPanel = () => {
    const [style, setStyle] = useState('none');
    const [loc, setLoc] = useState('');
    const [maxWidth, setMaxWidth] = React.useState('lg');
    // MUI Alert Code 
    const [pop, setPop] = useState(false);

    const handleClose = () => {
        setPop(false);
        setStyle('none');
    };


    const productFilter = (id, name) => {
        window.location.reload(false);
        localStorage.setItem('city_id', id);
        localStorage.setItem('city_name', name);
    }
    // LOAD ACTIONS
    let dispatch = useDispatch();
    const { citys } = useSelector(state => state.cityData);
    useEffect(() => {
        dispatch(loadCitys());
        setLoc(localStorage.getItem('city_name'));

    }, []);
    // LOAD ACTIONS ENDS
    return (
        <>
            <div className="col-xl-3 col-lg-3 col-md-3 col-3 bg-transparent">
                <Link to="#" className="bg-transparent d-flex flex-column align-items-center p-0 text-light" onClick={() => setPop(true)}>
                    <i className="fa fa-map-marker text-center"
                        style={{ fontSize: "13px" }}></i>
                    <span style={{
                        fontSize: "13px"
                    }}>
                        {!loc ? 'Location' : loc}
                    </span>
                </Link>

                {/* <!-- Modal --> */}

                <Dialog
                    open={pop}
                    maxWidth={maxWidth}
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalScrollableTitle">SELECT LOCATION</h5>
                                    <button className="btn btn-new bg-transparent text-dark" onClick={handleClose}>
                                        <span aria-hidden="true" className="location-cancel">&times;</span>
                                    </button>
                                </div>

                                <div class="modal-body col-lg-12">
                                    {citys &&
                                        citys.filter((val) => val.is_featured === 1).map((city, i) => {
                                            return (<button className="btn btn-new bg-light" 
                                            style={{border: "1px solid yellowgreen", padding: "4px 15px !important" }} key={i} >
                                                <div className="citys" data-dismiss="modal" onClick={() => productFilter(city.id, city.city_name)}>
                                                    <div className="city-list">
                                                        <img src={`${process.env.REACT_APP_IPURL}${city.city_icon}`} className='img-fluid text-cap' alt={city.city_name} />
                                                    </div>
                                                    <h5 className="text-center"><a className="navTextTranform text-cap">{city.city_name}</a></h5>
                                                </div></button>
                                            );
                                        })}
                                </div>

                                {/* <button className="btn btn-new btn-primary" onClick={() => setStyle('block')}>View All</button> */}
                                <div class="footer-widget" style={{ display: "block" }}>
                                    <h5 className='text-center mt-3'>Other Cities</h5>

                                   <div className="container-fluid">
                                   <ul class="footer-link row">
                                        {citys &&
                                            citys.filter((val) => val.is_featured !== 1).map((city, i) => {
                                                return (

                                                    <li className="col-lg-2 col-3 ml-2 mr-2 text-center" onClick={() => productFilter(city.id, city.city_name)} key={i}><button className="btn btn-new btn-new-nwe bg-transparent text-dark text-cap">{city.city_name}</button></li>
                                                );
                                            })}
                                    </ul>
                                   </div>
                                </div>

                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export default LocationPanel