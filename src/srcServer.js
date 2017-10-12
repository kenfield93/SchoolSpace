/**
 * Created by kyle on 9/17/17.
 */
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackConfig from '../webpack.config.dev.js';
import open from 'open';
import bodyparser from 'body-parser';

import config from './../tools/config';
/* eslint-disable no-console */
import userModel from '../model/users';
import apiRouterFactory from './api';

console.log("ayyo");

const port = config.port;
const app = express();
const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

const apiRouter = apiRouterFactory(express.Router());
app.use('/v1', apiRouter );

// diside which routes form what pages. Probably have each class as a seprate page
app.get('*', function(req, res) {
     res.sendFile(path.join(__dirname, '../src/index.html'));
});



app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`);
    }
});

