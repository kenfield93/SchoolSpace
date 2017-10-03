/**
 * Created by kyle on 9/25/17.
 */
import types from '../actions/actionTypes';
import initialState from './initialState';

export default function threadReducer(state = initialState.threads, action){
    switch(action.type){
        case types.LOAD_COURSE_THREADS_SUCCESS:
            return Object.assign([], action.threads);
        case types.LOAD_COURSE_THREADS_FAILURE:
            return state;

        default:
            return state;
    }
}