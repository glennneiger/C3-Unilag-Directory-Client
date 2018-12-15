import * as actionTypes from '../actionTypes'

const initialState = {
    school_admin: {}
};

const schoolReducer = (state = initialState, action) => {
     switch(action.type){
         case actionTypes.SET_SCHOOL_ADMIN:
             return {
                 ...state,
                 school_admin: { ...action.schAdmin }
             };

         default:
             return state;
     }
};

export default schoolReducer;