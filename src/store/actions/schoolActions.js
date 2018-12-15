import * as actionTypes from '../actionTypes';

export const loadSchoolAdmin = (theAdmin) => {
    return {
        type: actionTypes.SET_SCHOOL_ADMIN,
        schAdmin: theAdmin
    };
};