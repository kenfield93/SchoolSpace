/**
 * Created by kyle on 9/15/17.
 */

const userModel = {};
import dbPool from './database';
const loginInfoTable = 'login';
const userTable = 'users';
const userToClassTable = 'usertoclass';
const courses = 'class';


userModel.getUsersFromClass = (cId, ssId) => {
       const sql =
       "SELECT U.name, U.usrId " +
        "FROM class C INNER JOIN userstoclass UtoC " +
            "ON c.classId = UtoC.classId " +
        "INNER JOIN users U " +
            "ON U.usrId = UtoC.usrId "  +
        "WHERE C.classId = $1 AND c.ssId = $2 AND U.stuid = 1; ";
        return dbPool.query(sql, [cId, ssId], function(err, result){
            if(err){
                return false;
            }
            return true;
    });
};

/*
 Possibly write this as an sql function, don't think its needed since new users isn't going to happen super often,
 and this already handles it in 1 query. Email connects them, not user name
 so no need to insert/return usrId  from 1st insert to 2nd
 https://stackoverflow.com/questions/20561254/insert-data-in-3-tables-at-a-time-using-postgres
 */


userModel.insertUser = (email, name, salt, password) => {
    //Note I think pg node lib doesn't let you rereference a $ variable more than once for some reason, so pass email twice
    const sql =
    " BEGIN;" +
    ` INSERT INTO users (email, name, stuid) VALUES (\'${email}\', \'${name}\', 1); ` +
    ` INSERT INTO login (email, salt, password ) VALUES (\'${email}\', \'${salt}\', \'${password}\'); ` +
    " COMMIT;"
    ;
    return dbPool.query(sql, function(err, result){
        if(err){
            return false;
        }
        return true;
    });
};

// asumes salted
userModel.doesPasswordEmailValid = (email, password) => {
    const sql =
        " SELECT count(*) " +
        ` FROM ${loginInfoTable} ` +
        " WHERE $1 = email AND $2 = password ;"
    ;
    return dbPool.preparedquery(sql, [email, password], (err, result) => {
        if(err || result.rows[0] < 1){
            return false;
        }
        return true;

    });

};

//todo move this to the class model or something
userModel.getCourses = (userId) => {
    const sql =
        " SELECT * " +
        `FROM ${userToClassTable} as UtoC INNER JOIN ${courses} as C` +
        " ON UtoC.classId = C.classId " +
        " WHERE UtoC.usrId = $1"
    ;
    return dbPool.preparedquery(sql, [userId], (err, result) => {
       if(err || !result.rows[0]){
           console.log("Y HAVE U FORSAKEn me");
           return false;
       }
       return result.rows;
    });
};
export default userModel;
