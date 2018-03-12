import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../ClientSide/reducers/index';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
export default function configureStore(initState){
    return createStore(
        rootReducer,
        initState,
        applyMiddleware(thunk, reduxImmutableStateInvariant())
    );
}