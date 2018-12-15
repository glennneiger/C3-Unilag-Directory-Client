import * as actionTypes from "../actionTypes";

const initialState = {
    church_admin: {}
};

const churchReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_CHURCH_ADMIN:
            return {};

        default:
            return state;
    }
};

export default churchReducer;