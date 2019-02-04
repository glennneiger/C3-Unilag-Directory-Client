import * as actionTypes from '../actionTypes'

const initialState = {
    birthdaysArray: [],
    monthChartData: {},
    totalStudents: null,
    finalYearStudents: null,
};

const schoolReducer = (state = initialState, action) => {
     switch(action.type){
         case actionTypes.SET_SCHOOL_ADMIN:
             return {
                 ...state,
                 school_admin: { ...action.schAdmin }
             };
         case actionTypes.INITIALIZE_DASHBOARD_DATA:
             return {
                 ...state,
                 ...action.dashboardData
             };

         default:
             return state;
     }
};

export default schoolReducer;