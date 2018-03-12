/**
 * Created by kyle on 10/17/17.
 */
import types from '../ClientSide/actions/actionTypes';
import initialState from './initialState';

export default function schoolSessionReducer(state = initialState.schoolSessions, action){
    switch(action.type){
        case types.LOAD_SCHOOL_SESSIONS_SUCCESS:
            return Object.assign([], action.sessions);
        case types.LOAD_SCHOOL_SESSIONS_FAILURE:
            return state;
        case types.CLEAR_SCHOOL_SESSIONS:
            return [];
        default:
            return state;
    }
}
