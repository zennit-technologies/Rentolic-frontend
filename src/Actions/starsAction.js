import * as types from '../Constants/index';
import axios from 'axios';

const getStars = (stars) => ({
    type : types.GET_STARS,
    payload : stars,
});

// get all categoryes
export const loadStars = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/star-review`)
        .then((res) => {
            // console.log("reponse stars:", res);
            dispatch(getStars(res.data))
        })
        .catch((error) => {
            console.log(error);
        })
    };
};