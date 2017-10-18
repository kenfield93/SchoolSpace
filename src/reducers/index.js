import {combineReducers} from 'redux';
import courses from './courseReducer';
import schoolSessions from './schoolSessionReducer';
import threads from './threadReducer';
import posts from './postReducer';
import user from './userReducer';

import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    courses,
    schoolSessions,
    threads,
    posts,
    user,
    numAjaxCallsInProgress: ajaxCallsInProgress
});

export default rootReducer;