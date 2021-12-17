import * as ActionTypes from './ActionTypes';

export const Courses = (state = { isLoading: true,
    errMess: null,
    courses:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COURSES:
            return {...state, isLoading: false, errMess: null, courses: action.payload};

        case ActionTypes.COURSES_LOADING:
            return {...state, isLoading: true, courses: []}

        case ActionTypes.COURSES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};