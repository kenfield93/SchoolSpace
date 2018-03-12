/**
 * Created by kyle on 10/6/17.
 */
import types from '../ClientSide/actions/actionTypes';
import initialState from './initialState';

export default function (state = initialState.posts, action ) {
    let dictCopy, threadId, postId;
    switch (action.type){
        case types.LOAD_THREAD_POSTS_SUCCESS:
            dictCopy =  Object.assign({}, state);
            dictCopy[action.payload.threadId] = action.payload.posts;
            return dictCopy;
        case types.LOAD_THREAD_POSTS_FAILURE:
            return state;
        case types.CREATE_POST_SUCCESS:
            dictCopy = Object.assign({}, state);
            threadId = action.payload.threadId;
            dictCopy[threadId] = [action.payload.post].concat(dictCopy[threadId]);
            return dictCopy;
        case types.CREATE_POST_FAILURE:
            return state;
        case types.EDIT_POST_SUCCESS:
            dictCopy = Object.assign({}, state);
            threadId = action.payload.threadId, postId = action.payload.postId;
            dictCopy[threadId] = dictCopy[threadId].map(post => {
                if( post.id == postId)
                    post.text = action.payload.text;
                return post;
            });
            return dictCopy;
        case types.EDIT_POST_FAILURE:
            return state;

        default:
            return state;
    }
}