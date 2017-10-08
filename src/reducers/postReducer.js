/**
 * Created by kyle on 10/6/17.
 */
import types from '../actions/actionTypes';
import initialState from './initialState';

export default function (state = initialState.posts, action ) {
    let dictCopy;
    switch (action.type){
        case types.LOAD_THREAD_POSTS_SUCCESS:
            dictCopy =  Object.assign({}, state);
            dictCopy[action.payload.threadId] = action.payload.posts;
            return dictCopy;
        case types.LOAD_THREAD_POSTS_FAILURE:
            return state;

        default:
            return state;
    }
}