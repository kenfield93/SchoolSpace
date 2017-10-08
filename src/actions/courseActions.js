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
export function loadPostsSuccess(posts, threadId){
    console.log('loadPostSuccess');
    console.log("threadId %s", threadId);
   // threadId = 1;
    return {type: types.LOAD_THREAD_POSTS_SUCCESS, payload: {threadId, posts}};
}
export function loadPostsFailure(err){
    return {type: types.LOAD_THREAD_POSTS_FAILURE, err};
}
/* thunks */

// backend would find out corresponding userId via OAuth or session or someshit
export function loadUsersCourses(){
    return function(dispatch){
        dispatch(startAjaxCall());
        return axios.get(`http://${config.host}:${config.port}/v1/courses`)
            .then(courses => {
                dispatch(loadUsersCoursesSuccess(courses.data));
            }, err => {
                dispatch(loadUsersCoursesFailure(err));
                return Promise.reject(err);
            });
    };
}

export function loadCourseThreads(classId){
    return function(dispatch){
        dispatch(startAjaxCall());
        return axios.get(`http://${config.host}:${config.port}/v1/threadsByClassId/${classId}`)
            .then(threads => {
                dispatch(loadCourseThreadsSuccess(threads.data));
            }).catch(err => {
                dispatch(loadCourseThreadsFailure(err));
                return Promise.reject(err);
            });
    };
}

export function loadPostsByThread(threadId){
    return function(dispatch){
        dispatch(startAjaxCall());
        return axios.get(`http://${config.host}:${config.port}/v1/postsByThreadId/${threadId}`)
            .then(posts => {
                dispatch(loadPostsSuccess( posts.data, threadId));
            }).catch(err => {
                dispatch(loadPostsFailure(err));
                return Promise.reject(err);
            });
    };
}