/**
 * Created by kyle on 9/24/17.
 */
import types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.userCourses, action){
    switch(action.type){
        case types.LOAD_COURSES_SUCCESS:
            return Object.assign([], action.courses);
        case types.LOAD_COURSES_FAILURE:
            return state;
        default:
            return state;
    }
}