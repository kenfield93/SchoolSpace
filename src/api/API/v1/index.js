/**
 * Created by kyle on 10/4/17.
 */
import userModel from '../../../../model/users';
import courseModel from '../../../../model/course';

const minSaltSize = 6;
const minEmailSize = 5;
//TODO extract the api logic out to a controller folder
//TODO set up middleware for non fatal errors? like if we call next() from a func it should go to that error next
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

    /****
     * Inputer: { orgId: key/number, ssId: key/number, teaId name: string}
     */
    Router.post('/createCourse', function(req, res, next){
        const newCourse = req.body.courseInfo;
        if(!newCourse || !newCourse.tokens)
            return res.status(400).send("Not authorized");
        const tokens = newCourse.tokens;
        const userInfo = mapAccessTokenToUserInfo(tokens.accessToken);
        newCourse.orgId = userInfo.orgId;
        newCourse.usrId = userInfo.usrId;
        //TODO either deduce/map/create orgId from tokens or use tokens to validate that org id is valid
        if(!newCourse) {
            return res.status(422).send("No course info specified");
        }
        if(isNaN(newCourse.orgId) || newCourse.orgId < 0 ) {
            return res.status(422).send("Invalid  oganization");
        }
        if( isNaN(newCourse.ssId) || newCourse.ssId < 0) {
            return res.status(422).send("Invalid  school session");
        }
        if(isNaN(newCourse.usrId) || newCourse.usrId < 0) {
            return res.status(422).send("Invalid teacher ");
        }
        if(!newCourse.name || newCourse.name.trim().length < 3 ) {
            return res.status(422).send("Course needs name with at least 3 characters");
        }
        courseModel.createCourse(newCourse.name, newCourse.usrId, newCourse.ssId, newCourse.orgId)
            .then( result => {
                res.status(200).send(result);
            }).catch(err => {
            res.status(500).send(err);
        });


    });

    Router.post('/getSchoolSessions', function(req, res, next){
        const uI = req.body.userInfo;
        if(!uI || !uI.tokens ) return res.status(401).send("Not authroized");
        const tokens = uI.tokens;

        const userInfo = mapAccessTokenToUserInfo(tokens.accessToken);
        courseModel.loadSchoolSessions(userInfo.orgId)
            .then( result => {
                res.status(200).send(result);
            }).catch(err => {
            res.status(500).send(err);
        });
    });
    const mapAccessTokenToUserInfo = (token) => {
        return {orgId:1, usrId:26};
    };
    return Router;
}