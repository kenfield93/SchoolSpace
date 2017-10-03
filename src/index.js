/**
 * Created by kyle on 9/17/17.
 */
//TODO bring in only part of polyfill needed, probably just object.assign
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import './styles/styles.css'; // Webpack bundles these 2 css files w/ our JS
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

/* can pass initial state to store to overwrite courseReducer initial state
    might do this for rehydrating store from data from server/local storage.
    ex: some data that was saved from a previous session and want to use to repopulate view
*/
const store = configureStore();
/*provider attatches our store to our react container components
 by putting at point of entry to app we only need it in one place
*/
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);