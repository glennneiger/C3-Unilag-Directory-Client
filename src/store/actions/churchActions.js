import * as actionTypes from "../actionTypes";

export const loadChurchAdmin = (theAdmin) => {
    return {
        type: actionTypes.SET_SCHOOL_ADMIN,
        churchAdmin: theAdmin
    };
};