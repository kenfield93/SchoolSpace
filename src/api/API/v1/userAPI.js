/**
 * Created by kyle on 10/20/17.
 */
import userModel from '../../../../model/users';

const MIN_USER_NAME_LEN = 3;
const MIN_SALT_LEN = 6;
const MIN_EMAIL_LEN = 5;
export function userLoginInfo({uniqueIdentifier, password}) {

    return userModel.getUserLoginInfo(uniqueIdentifier)
        .then(result => {
            const pwd = encryptPassword(password, result.salt);
            if (pwd === password) {
                const tokens = createOAuthTokens(uniqueIdentifier, pwd);
                return Promise.resolve({uniqueIdentifier, tokens});
            }
            return Promise.reject("Incorrect Login info");
        }).catch(err => {
        return err;
    });
}

export function loginUser(responseStream, loginInfoPromise){
    loginInfoPromise.then(info => {
        userModel.getUserAccountInfo(info.uniqueIdentifier)
            .then(result => {
                const user = Object.assign(Object.assign({}, info), result );
                user.isTeacher = !!user.isteacher;
                user.isStudent = !!user.isstudent;
                responseStream.status(200).send(user);
            });
    }).catch(err => {
        responseStream.status(500).send(null);
    });
}

export function createUser(responseStream, {name, email, password, confirmPassword}){
    // Todo other password validation. No illegal characters, etc

    if(password !== confirmPassword ) {
        return responseStream.status(422).send("Error: Passwords don't match");
    }
    if(email.indexOf('@') == -1 || email.length <= MIN_EMAIL_LEN){
        return responseStream.status(422).send("Error: Email Too short or not valid");
    }
    if(name.trim().length < MIN_USER_NAME_LEN)
        return responseStream.status(422).send(`Error: Name must be at least ${MIN_USER_NAME_LEN} characters`);

    const user = {};
    user.salt = genSalt(password, MIN_SALT_LEN);
    user.password = encryptPassword(password, user.salt);
    user.email = email;
    user.name = name.trim();

    userModel.insertUser(user)
        .then( result => {
            responseStream.status(200).send(true);
        }).catch(err => {
        responseStream.status(500).send(err);
    });
}

const createOAuthTokens = (email, password) => {
    return {authToken: 1, accessToken: 1};
};

const encryptPassword = (psw, salt) => {
    return psw;
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