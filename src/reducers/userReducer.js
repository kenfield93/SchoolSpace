/**
 * Created by kyle on 10/15/17.
 */
import types from '../actions/actionTypes';
import initialState from './initialState';

export default function (state = initialState.user, action ) {
    let userCopy;
    switch (action.type){
        case types.CREATE_USER_SUCCESS:
            return state;
        case types.CREATE_USER_FAILURE:
            return state;
        case types.LOGIN_SUCCESS:
            userCopy = Object.assign({}, action.user);
            userCopy.tokens = Object.assign({}, action.user.tokens);
            return userCopy;
        case types.LOGIN_FAILURE:
            return state;

        default:
            return state;
    }

}
