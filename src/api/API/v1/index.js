/**
 * Created by kyle on 10/4/17.
 */
import userModel from '../../../../model/users';
import courseModel from '../../../../model/course';
import * as courseAPI from './coursesAPI';

const minSaltSize = 6;
const minEmailSize = 5;
//TODO extract the api logic out to controller files
//TODO set up middleware for non fatal errors? like if we call next() from a func it should go to that error next
export default function (Router){
    //Can set middleware for router to do things like log api usage, authenticate, etc..

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

        courseAPI.createCourse(res, uI.orgId, uI.usrId, newCourse.title, newCourse.ssId)
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
        courseModel.getThreadPosts(thrId)
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

    /* Input: {uniqueIdentifier: str, password: str}
       Output:
       On success returns
       {
        name: str
        teaId: int/null
        stdId: int/null
        email: str
        tokens: { authToken: str, accessToken: str}
       }
     */
    Router.post('/login', function(req, res, next){
        const loginInfo = req.body.loginInfo;
        if(!loginInfo || !loginInfo.uniqueIdentifier || !loginInfo.password || loginInfo.password.length < 8)
            return res.status(422).send("Error: Incorrect Signup info");

        const email = loginInfo.uniqueIdentifier;

        const loginInfoPromise = userModel.getUserLoginInfo(email)
            .then( result => {
                const pwd = encryptPassword(loginInfo.password, result.salt);
                if( pwd === loginInfo.password) {
                    const tokens = oAuth(email,pwd);
                    return Promise.resolve({email, tokens});
                }
                return Promise.reject("Incorrect Login info");
            }).catch(err => {
                return err;
            });

        loginInfoPromise.then(info => {
                userModel.getUserAccountInfo(info.email)
                    .then(result => {
                        const user = Object.assign(Object.assign({}, info), result );
                        user.isTeacher = !!user.isteacher;
                        user.isStudent = !!user.isstudent;
                        res.status(200).send(user);
                    });
        }).catch(err => {
           res.status(500).send(null);
        });
    });
    /* Input:
     {
     name: str
     email: str
     password: str
     confirmPassword: str
     }
     Output:
     On success returns true, else err

     */
    //TODO can extract this validatoin out and then use it front end & backend
    Router.post('/createUser', function(req, res, next){
        const user = {},
            info  = req.body.signupInfo;
        console.log("createUser");
        console.log(info);
        if(!info)
            return res.status(422).send("Error: Incorrect Signup info");
        if(info.password !== info.confirmPassword ) {
            return res.status(422).send("Error: Passwords don't match");
        }
        if(info.email.indexOf('@') == -1 || info.email.length <= minEmailSize){
            return res.status(422).send("Error: Email Too short or not valid");
        }
        if(!info.name)
            return res.status(422).send("Error: No nam");
        // todo other password validation. No illegal characters, etc

        user.salt = genSalt(info.password, minSaltSize);
        user.password = encryptPassword(info.password, user.salt);
        user.email = info.email;
        user.name = info.name;

        userModel.insertUser(user)
            .then( result => {
                res.status(200).send(true);
            }).catch(err => {
                res.status(500).send(err);
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

    const mapAccessTokenToUserInfo = (token) => {
        return {orgId:1, usrId:6};
    };
    const genSalt = (str, minSaltLength) => {
        minSaltLength = minSaltLength > str.length ? str.length : minSaltLength;
        const salt = [];
        let saltLen = 0;
        while(saltLen < minSaltLength) {
            salt.push(String.fromCharCode((Math.floor(Math.random() * 0xFFF))));
            saltLen++;
        }
        return salt.join('');
    };
    const encryptPassword = (psw, salt) => {
        return psw;
    };
    const oAuth = (email, password) => {
        return {authToken: 1, accessToken: 1};
    };

    return Router;
}