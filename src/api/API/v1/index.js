/**
 * Created by kyle on 10/4/17.
 */
import userModel from '../../../../model/users';
import courseModel from '../../../../model/course';

//TODO extract the api logic out to a controller folder
export default function (Router){

    //Can set middleware for router to do things like log api usage, authenticate, etc..

    //not userId should id or signature should be attatched to req.param set from above middleware
    Router.get('/courses', function(req, res, next){
        userModel.getCourses(6)
            .then(result => {
                res.status(200).send(result);
            }).catch(err => {  res.status(500).send([]);});
    });

    Router.post('/courses', function(req, res, next){
        const newCourse = req.body.course;
        if(!newCourse || !newCourse.orgId || !newCourse.title)
            res.status(422).send("Incorrect input for creating a new course");

        const {orgId, title, ssid} = newCourse;
        courseModel.createCourse(orgId, title, ssid);
    });

    /* Probably need to seperate each 'keyword' ex courses, threads, etc into own router to use Router.param to auth operation
       Router.param is good for auth because it'll run regardless of Router.METHOD used

    Router.param('classId', function(req, res, next){
       //TODO do auth for threads ops here
        next();
    });
    */
    Router.get('/threads/:classId', function(req, res, next){
            courseModel.getThreadPosts(1)
                .then(result => {
                    res.status(200).send(result);
                }).catch(err => {res.status(500).send([])});
    });
    return Router;
}