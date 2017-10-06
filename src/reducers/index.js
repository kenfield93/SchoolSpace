import {combineReducers} from 'redux';
import courses from './courseReducer';
import threads from './threadReducer';
import posts from './postReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    courses,
    threads,
    posts,
    numAjaxCallsInProgress: ajaxCallsInProgress
});

export default rootReducer;