/**
 * Created by kyle on 9/17/17.
 */
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackConfig from '../webpack.config.dev';
import open from 'open';
import config from './config';
/* eslint-disable no-console */
import userModel from '../model/users';

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


/*
app2.get('/v1/courses', function(req, res){
    console.log("Worship me");
    userModel.getCourses(6)
        .then(result => {
            res.status(200).send({result});
        }).catch(err => {  res.status(500).send([]);});
});
*/
app.use('/v1/*', function(req, res, next){

    if(req.originalUrl == '/v1/courses'){
        console.log("my authority");
        userModel.getCourses(6)
            .then(result => {
                res.status(200).send(result);
            }).catch(err => {  res.status(500).send([]);});
    }
});
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

