/**
 * Created by kyle on 9/25/17.
 */
import types from '../actions/actionTypes';
import initialState from './initialState';

//todo set up reducer and actions. need to pass posts and thread id for thus part but not to actual store
// Gonna wanna make a seperate posts reducer honestly
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