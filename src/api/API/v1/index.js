/**
 * Created by kyle on 10/4/17.
 */
import userModel from '../../../../model/users';
import courseModel from '../../../../model/course';
import * as courseAPI from './coursesAPI';
import * as userAPI from './userAPI';
//TODO extract the api logic out to controller files
//TODO set up middleware for non fatal errors? like if we call next() from a func it should go to that error next
export default function (Router){
    /*******************************************/
    //Router middleware for things like  log api usage, authenticate, etc..

    Router.use(function(req, res, next){
        console.log(req.method, req.url);
        const tokens = req.body.tokens;
        if( req.url == '/courses' || req.url == '/createCourse' || req.url == '/getSchoolSessions') {
            if (!tokens || tokens.accessToken === null || tokens.accessToken === undefined)
                return res.status(401).send("Couldn't authroize action");
            else {
                req.body.userInfo = mapAccessTokenToUserInfo(tokens);
                next();
            }
        }
        else {
            next();
        }
    });

    const mapAccessTokenToUserInfo = (token) => {
        return {orgId:1, usrId:6};
    };
    /********************************************/

    /****
      * Input: user's info ->  {userInfo: {usrId: number}}
      * Output: courses -> [{classid: number, classname: str, ssid: number }, ...]
      */
    Router.post('/courses', function(req, res, next){
        const uI = req.body.userInfo;
        if(!uI || !uI.usrId ) return res.status(401).send("Not authroized");

        courseAPI.getCourses( res, uI.usrId);
    });
    /****
     * Input:  user's info -> {userInfo: {usrId: num, orgId: num} }
     * Output: course -> {classid: number, classname: str, ssid: number }
     */
    Router.post('/createCourse', function(req, res, next){
        const newCourse = req.body.courseInfo;
        const uI = req.body.userInfo;
        if(!newCourse || !uI)
            return res.status(401).send("No course info specified: Not authorized");

        courseAPI.createCourse(res, uI.orgId, uI.usrId, newCourse.title, newCourse.ssId);
    });
    /****
     * Input: user's info -> {userInfo: {orgId: num} }
     * Output: schoolSessions -> [ { ssid: num, session: str }, ... ]
     */
    Router.post('/getSchoolSessions', function(req, res, next){
        const uI = req.body.userInfo;
        if(!uI || !uI.orgId ) return res.status(401).send("Not authroized");

        courseAPI.getSchoolSessions(res, uI.orgId);
    });
    /* Input: loginInfo: {uniqueIdentifier: str, password: str}, Tokens:{accessToken, authToken}
     Output:
     On success returns
     {
     name: str
     teaId: int/null
     stdId: int/null
     email: str
     }
     */
    Router.post('/login', function(req, res, next){
        const loginInfo = req.body.loginInfo;
        if(!loginInfo || !loginInfo.uniqueIdentifier || !loginInfo.password || loginInfo.password.length < 8)
            return res.status(422).send("Error: Incorrect Signup info");

        userAPI.loginUser( res, userAPI.userLoginInfo(loginInfo));

    });
    /* Input:
     singupInfo: {
        name: str
        email: str
        password: str
        confirmPassword: str
     }, tokens:{authToken: str, accessToken: str}
     Output:
     On success returns true, else err
     */
    //TODO can extract out signup validation and use it front end as well
    Router.post('/createUser', function(req, res, next){
        // const user = {},
        const info  = req.body.signupInfo;

        if(!info || !info.password || !info.confirmPassword || !info.email)
            return res.status(422).send("Error: Incorrect Signup info");

        userAPI.createUser(res, info);
    });


    Router.get('/threadsByClassId/:classId', function(req, res, next){
        const classId = req.params.classId;
        if(!classId || isNaN(classId) || classId < 1)
            return res.status(422).send("Error: Must get threads by ClassId");
        courseModel.getThreads(classId)
            .then(result => {
                res.status(200).send(result);
            }).catch(err => {res.status(500).send([]); });
    });

    Router.get('/postsByThreadId/:threadId', function(req, res, next){
        const thrId = req.params.threadId;
        if(!thrId || isNaN(thrId) )
            return res.status(422).send("Error: Must get posts by ThreadId");
        courseModel.getPosts(thrId)
            .then(result => {
                res.status(200).send(result);
            }).catch(err => {
            res.status(500).send([]); });

    });
    function isPostPostsInputValid(body){
        if(!body) return false;
        if(body.usrId === null || body.usrId === undefined || isNaN(body.usrId) || body.usrId < 0 )
            return false;
        if(body.threadId === null || body.threadId === undefined || isNaN(body.threadId) || body.threadId < 0 )
            return false;
        if(  body.responseToId === undefined || isNaN(body.responseToId) || body.responseToId < 0 )
            return false;
        if(body.text === null || body.text === undefined || body.text.length < 1)
            return false;
        return true;
    }
    Router.post('/posts', function(req,res,next){
        req.body.usrId = 6;
        if(!isPostPostsInputValid(req.body))
            return res.status(422).send("Error: Improper inputs");
        courseModel.createPost(req.body)
            .then( result => {
                res.status(200).send(result);
            }).catch(err => {
                res.status(500).send(false);
        });

    });

    Router.patch('/editPost', function(req, res, next){
        const eI = req.body.editInfo;
        if(!eI || !eI.tokens || eI.postId)
            return res.status(422).send("Err confirming user and/or post");
        if(( !eI.text || eI.text.trim().length == 0))
            return res.status(422).send("Edit requires new post to be made");

        const text = eI.text;
        const postId = eI.postid;
        const userInfo = mapAccessTokenToUserInfo(eI.tokens.accessToken);
        courseModel.editPost(userInfo.userId, postId, text )
            .then( result => {
                res.status(200).send({text, postId });
            }).catch(err => {
            res.status(500).send(err);
        });
    });

    return Router;
}