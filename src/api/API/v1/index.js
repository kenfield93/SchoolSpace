/**
 * Created by kyle on 10/4/17.
 */
import userModel from '../../../../model/users';

export default function (Router){

    //Can set middleware for router to do things like log api usage, authenticate, etc..

    //not userId should id or signature should be attatched to req.param set from above middleware
    Router.get('/courses', function(req, res, next){
        userModel.getCourses(6)
            .then(result => {
                res.status(200).send(result);
            }).catch(err => {  res.status(500).send([]);});
    });



    return Router;
}