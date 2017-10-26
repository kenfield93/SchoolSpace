/**
 * Created by kyle on 10/13/17.
 */
import types from './actionTypes';
import {startAjaxCall} from './ajaxStatusAction';
import config from '../../tools/config';
import axios from 'axios';

export function createUserSuccess(user){
    return {type: types.CREATE_USER_SUCCESS, user};
}
export function createUserFailure(err){
    return {type: types.CREATE_USER_FAILURE, err};
}
export function loginSuccess(user){
    return {type: types.LOGIN_SUCCESS, user};
}
export function loginFailure(err){
    return {type: types.LOGIN_FAILURE, err};
}


/* thunks */

export function createUser(userInfo){
    return function(dispatch){
       if(! userInfo) return Promise.reject('No userInfo Specified');
       dispatch(startAjaxCall());
        console.log("userInfo"); console.log(userInfo);
       return axios.post(`http://${config.host}:${config.port}/v1/createUser`, {signupInfo: userInfo})
            .then( resp => {
                const user = resp.data;
                dispatch(createUserSuccess(user));
                return user;
            }).catch( err => {
                dispatch(createUserFailure(err));
                return Promise.reject(err);
            });
    };
}

export function loginUser(uniqueIdentifier, password){
    return function(dispatch){
        dispatch(startAjaxCall());
        return axios.post(`http://${config.host}:${config.port}/v1/login`, {loginInfo: {uniqueIdentifier, password}})
            .then( resp => {
                dispatch(loginSuccess(resp.data));
            }).catch(err => {
                dispatch(loginFailure(err));
                return Promise.reject(err);
            });
    };
}