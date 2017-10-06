/**
 * Created by kyle on 9/17/17.
 */
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackConfig from '../webpack.config.dev';
import open from 'open';
import bodyparser from 'body-parser';

import config from './config';
/* eslint-disable no-console */
import userModel from '../model/users';
import apiRouterFactory from '../src/api/API/v1/index';

console.log("ayyo");

//    userModel.insertUser('easfbbcang@g', 'bobby', 'fuckthehouse', 'thisisstupid')
 //   .then(result => {console.log("added"); return Promise.resolve(true);}, err => {console.log("Doo doo " + err);});
    //.catch(err => {console.log("FAIL "); console.log(err);});

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


//TODO change this for multi page webapp
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

