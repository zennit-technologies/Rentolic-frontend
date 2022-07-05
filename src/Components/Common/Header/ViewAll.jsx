import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadCategoryes } from '../../../Actions/categoryAction';
import { loadSubCategoryes } from '../../../Actions/SubCategoryAction';
import arrowDown from './arrowDown.png'

const ViewAll = () => {
    const [accord, setAccord] = useState(1);
    var i = 1;

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
    // LOAD ACTIONS ENDS 
    return (
        <>
            {/* <!-- Button trigger modal --> */}
            <button type="button" class="btn-new btn bt-primary" data-toggle="modal" data-target="#exampleModalCenter">
                View categories
            </button>

            {/* <!-- Modal --> */}
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content modal-content-new">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">All Category</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <div className="colum" style={{ width: "100%" }}>

                                {/* <!-- portfolio-area start --> */}
                                {categoryes &&
                                    categoryes.filter((val) => val.status === 1).map((category, i) => {
                                        return (
                                            <ul>
                                                <li className="nav-item nav-item-new">
                                                    <a className="nav-link nav-link-a d-flex " style={{ width: "100%" }} data-toggle="collapse" aria-expanded="false" aria-controls="ui-basic" onClick={() => { setAccord(+i) }}>
                                                        <span className="menu-title">{category.category_name}</span>
                                                        <span className='icon-down'><img src={arrowDown} alt="" className='img-fluid' style={{ maxWidth: '7%' }} /></span>
                                                    </a>
                                                    {
                                                        subCategoryes && subCategoryes.filter((val) => {
                                                            return val.category_id == category.id;
                                                        }).map((val) => {
                                                            return <div className="collapse" id="ui-basic" style={{ display: accord === +i ? 'block' : 'none' }}>
                                                                <ul className="nav flex-column sub-menu">
                                                                    <li className="nav-item">
                                                                        <Link className="nav-link nav-link-a" style={{ width: "100%" }} to={`/category/${val.name}/${val.id}`}>
                                                                            <span className="menu-title">{val.name}</span>
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        })
                                                    }
                                                </li>
                                            </ul>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewAll