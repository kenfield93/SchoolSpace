/**
 * Created by kyle on 3/10/18.
 */

const tables = {
    loginInfo: 'login',
    userTable: 'users',
    userToClass: 'usertoclass',
    courses: 'class'
};

methods = (dbAdapter) => {
    return {
        getUsersFromClass : (cId, ssId) => {
            const sql =
                "SELECT U.name, U.usrId " +
                `FROM class C INNER JOIN ${table.userstoclass} UtoC ` +
                "ON c.classId = UtoC.classId " +
                `INNER JOIN ${table.users} U ` +
                "ON U.usrId = UtoC.usrId " +
                "WHERE C.classId = $1 AND c.ssId = $2 AND U.stuid = 1; ";
            return dbAdapter.query(sql, [cId, ssId], function (err, result) {
                if (err) {
                    return false;
                }
                return true;
            });
        },


        insertUser : ({email, name, salt, password}) => {
            //Note I think pg node lib doesn't let you rereference a $ variable more than once for some reason, so pass email twice
            const sql =
                    " BEGIN;" +
                    ` INSERT INTO ${table.users} (email, name, stuid) VALUES (\'${email}\', \'${name}\', 1); ` +
                    ` INSERT INTO ${table.login} (email, salt, password ) VALUES (\'${email}\', \'${salt}\', \'${password}\'); ` +
                    " COMMIT;"
                ;
            return dbAdapter.query(sql, function (err, result) {
                if (err) {
                    return false;
                }
                return true;
            });
        },

        getUserLoginInfo : (email) => {
            const sql =
                    `SELECT * FROM ${table.loginInfoTable} WHERE $1 = email; `
                ;
            return dbAdapter.preparedquery(sql, [email], (err, result) => {
                if (err) return false;
                return result.rows[0];
            });
        },

        getUserAccountInfo : (email) => {
            const sql =
                    "SELECT teaid as isTeacher, stuid as isStudent, name " +
                    ` FROM ${table.userTable} WHERE $1 = email; `
                ;
            return dbAdapter.preparedquery(sql, [email], (err, result) => {
                if (err) return false;
                return result.rows[0];
            });
        },

        doesPasswordEmailValid : (email, encryptedPwd) => {
            const sql =
                    " SELECT count(*) " +
                    ` FROM ${table.loginInfoTable} ` +
                    " WHERE $1 = email AND $2 = password ;"
                ;
            return dbAdapter.preparedquery(sql, [email, encryptedPwd], (err, result) => {
                if (err || result.rows[0] < 1) {
                    return false;
                }
                return true;
            });

        }
    };
};

export default (dbAdapter) => {
    var fn = methods(dbAdapter);
    return {
        getUsersFromClass: fn.getUsersFromClass,
        insertUser: fn.insertUser,
        getUserLoginInfo: fn.getUserLoginInfo,
        getUserAccountInfo: fn.getUserAccountInfo,
        doesPasswordEmailValid: fn.doesPasswordEmailValid
    };
};
