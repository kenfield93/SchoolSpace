import types from './actionTypes';
import courseAPI from '../api/mockAPI/classAPI';
import {startAjaxCall} from './ajaxStatusAction';
import config from '../../tools/config';
import axios from 'axios';

export function loadUsersCoursesSuccess(courses){
    return {type: types.LOAD_COURSES_SUCCESS, courses};
}
export function loadUsersCoursesFailure(err){
    return {type: types.LOAD_COURSES_FAILURE, err};
}
export function loadCourseThreadsSuccess(threads){
    return {type: types.LOAD_COURSE_THREADS_SUCCESS, threads};
}
export function loadCourseThreadsFailure(err){
    return {type: types.LOAD_COURSE_THREADS_FAILURE, err};
}

/* thunks */

// backend would find out corresponding userId via OAuth or session or someshit
export function loadUsersCourses(){
    return function(dispatch){
        dispatch(startAjaxCall());
        return axios.get(`http://${config.host}:${config.port}/v1/courses`)
            .then(courses => {
                console.log("notice me");
                console.log(courses.data);
                dispatch(loadUsersCoursesSuccess(courses.data));
            }, err => {
                console.log("bow to me");
                dispatch(loadUsersCoursesFailure(err));
                return Promise.reject(err);
            });
        /*
        return courseAPI.getUserClasses()
            .then(courses => {
                dispatch(loadUsersCoursesSuccess(courses));
            }, err => {
                dispatch(loadUsersCoursesFailure(err));
                return Promise.reject(err);
            });
            */
    };
}

export function loadCourseThreads(classId){
    return function(dispatch){
        dispatch(startAjaxCall());
        return axios.get(`http://${config.host}:${config.port}/v1/threads/${classId}`)
            .then(threads => {
                console.log('threads');
                console.log(threads.data);
                dispatch(loadCourseThreadsSuccess(threads.data));
            }).catch(err => {
                console.log("error bb");
                dispatch(loadCourseThreadsFailure(err));
                return Promise.reject(err);
            });
    };
}