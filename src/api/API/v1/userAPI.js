/**
 * Created by kyle on 10/20/17.
 */

const MIN_USER_NAME_LEN = 3;
const MIN_SALT_LEN = 6;
const MIN_EMAIL_LEN = 5;

methods = (userRepo) => {
    return {
        userLoginInfo: ({uniqueIdentifier, password}) => {

            return userRepo.getUserLoginInfo(uniqueIdentifier)
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
        },

        loginUser: (responseStream, loginInfoPromise) => {
            loginInfoPromise.then(info => {
                userRepo.getUserAccountInfo(info.uniqueIdentifier)
                    .then(result => {
                        const user = Object.assign(Object.assign({}, info), result);
                        user.isTeacher = !!user.isteacher;
                        user.isStudent = !!user.isstudent;
                        responseStream.status(200).send(user);
                    });
            }).catch(err => {
                responseStream.status(500).send(null);
            });
        },

        createUser : (responseStream, {name, email, password, confirmPassword}) => {
            // Todo other password validation. No illegal characters, etc

            if (password !== confirmPassword) {
                return responseStream.status(422).send("Error: Passwords don't match");
            }
            if (email.indexOf('@') == -1 || email.length <= MIN_EMAIL_LEN) {
                return responseStream.status(422).send("Error: Email Too short or not valid");
            }
            if (name.trim().length < MIN_USER_NAME_LEN)
                return responseStream.status(422).send(`Error: Name must be at least ${MIN_USER_NAME_LEN} characters`);

            const user = {};
            user.salt = genSalt(password, MIN_SALT_LEN);
            user.password = encryptPassword(password, user.salt);
            user.email = email;
            user.name = name.trim();

            userRepo.insertUser(user)
                .then(result => {
                    responseStream.status(200).send(true);
                }).catch(err => {
                responseStream.status(500).send(err);
            });
        }
    };
};

export  default (userRepo) => {
    var fns = methods(userRepo);
    return {
        createUser: fns.createUser,
        loginUser: fns.loginUser,
        userLoginInfo : fns.userLoginInfo
    }
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