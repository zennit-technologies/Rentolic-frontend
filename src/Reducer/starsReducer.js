import * as types from "../Constants/index";

const initialState = {
    stars: [],
    loading: true,
};

const starsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_STARS:
            return {
                ...state,
                stars: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default starsReducer;
