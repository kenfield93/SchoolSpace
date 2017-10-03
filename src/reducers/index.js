import {combineReducers} from 'redux';
import courses from './courseReducer';
import threads from './threadReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    courses,
    threads,
    numAjaxCallsInProgress: ajaxCallsInProgress
});

export default rootReducer;