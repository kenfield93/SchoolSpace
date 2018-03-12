
const table = {
    login : 'login',
    users : 'users',
    userToClass : 'usertoclass',
    courses : 'class',
    threads : 'thread',
    schoolSessions : 'schoolsession',
    posts : 'post'
};
const alias =
{
     postId : 'id',
     postText: 'text'
};

methods = (dbAdapter) =>
{
    return {
            getCourses : (userId) => {
            const sql =
                    " SELECT C.classid, classname, ssid " +
                    `FROM ${table.userToClass} as UtoC INNER JOIN ${table.courses} as C` +
                    " ON UtoC.classId = C.classId " +
                    " WHERE UtoC.usrId = $1"
                ;
            return dbAdapter.preparedquery(sql, [userId], (err, result) => {
                if (err || !result.rows[0]) {
                    return false;
                }
                return result.rows;
            });
        },

        getClassMembers : (classId) => {
            const sql =
                    " SELECT usrid, name " +
                    ` FROM ${table.users} u INNER JOIN ${table.userToClass} as userToClass ` +
                    " ON u.usrid = userToClass.usrid " +
                    " WHERE userToClass.classid = $1 ;"
                ;

            return dbAdapter.preparedquery(sql, [classId], (err, result) => {
                return (err) ? false : result.rows;
            });
        },

        createCourse : (title, usrId, ssId, orgId) => {
            let ssIdLabelSql = "", ssIdValueSql = "";
            if (!isNaN(ssId)) {
                ssIdLabelSql = ", ssId ";
                ssIdValueSql = ", $4";
            }
            const sql =
                    "WITH newClass as( " +
                    ` INSERT INTO ${table.courses} (orgId, classname ${ssIdLabelSql} ) ` +
                    ` VALUES ( $1, $2 ${ssIdValueSql}) ` +
                    " RETURNING classid ) " +

                    ` INSERT INTO ${table.userToClass} (usrid, classid) ` +
                    " VALUES ( $3, (SELECT classid from newClass)) RETURNING classid ; "
                ;
            return dbAdapter.preparedquery(sql, [orgId, title, usrId, (!isNaN(ssId)) ? ssId : null], function (err, result) {
                return (err) ? false : result.rows[0];
            });
        },

        loadSchoolSessions : (orgId) => {
            var sql =
                    "SELECT ssid, name as session " +
                    ` FROM ${table.schoolSessions} WHERE orgId = $1`
                ;

            return dbAdapter.preparedquery(sql, [orgId], function (err, result) {
                if (err || result.rows.length == 0)
                    return false;
                return result.rows;
            });
        },

        getPosts : (thrId) => {
            var sql =
                    "SELECT tp.id, text, responseToPostId, postTime, likeCnt, name, u.usrId AS usrId " +
                    "FROM ( SELECT p.usrId AS usrId, p.responseToPostId, p.postText as text, p.postId as id, p.postTime, p.likeCnt " +
                    `FROM ${table.posts} p INNER JOIN ${table.threads} t ` +
                    "ON p.thrId = t.thrId " +
                    "WHERE p.thrId = $1 " +
                    ") AS tp " +
                    `INNER JOIN ${table.users} u ` +
                    "ON u.usrId = tp.usrId " +
                    "ORDER BY tp.responseToPostId DESC, tp.postTime ; "
                ;

            return dbAdapter.preparedquery(sql, [thrId], function (err, result) {
                return (err) ? false : result.rows;
            });
        },

    // todo: refactor for pagination (get first 10, then next 10 and so on)
        getThreads : (classId) => {
            var sql =
                    "SELECT thread.title, thread.id, p.posttext as text " +
                    "FROM (SELECT title, t.thrid as id, mainpostid " +
                    `FROM ${table.threads} t INNER JOIN ${table.courses} c ` +
                    "ON t.classid = c.classid " +
                    "WHERE t.classid = $1" +
                    "LIMIT 10 " +
                    `) as thread LEFT OUTER JOIN ${table.posts} p ` +
                    "ON thread.mainpostid = p.postid; "
                ;

            return dbAdapter.preparedquery(sql, [classId], function (err, result) {
                return (err) ? false : result.rows;
            });
        },

        createPost : ({usrId, threadId, responseToId, text}) => {
            var sql =
                    `INSERT INTO ${table.posts} (usrId, thrId, responsetopostid, postText) ` +
                    ` VALUES ($1, $2, $3, $4) RETURNING postId AS ${alias.postId} , postText AS ${alias.postText}, responseToPostId, postTime, likeCnt, null AS name ;`
                ;

            return dbAdapter.preparedquery(sql, [usrId, threadId, responseToId, text], function (err, result) {
                return (err) ? false : result.rows[0];
            });
        },

        editPost : (userId, postId, text) => {
            var sql =
                    `UPDATE ${table.posts} SET postText = $1 ` +
                    "WHERE usrId = $2 AND postId = $3"
                ;

            return dbAdapter.preparedquery(sql, [text, userId, postId], function (err, result) {
                return (err) ? false : text
            });
        }
    };
};
export default (dbAdapter) => {
    var fn = methods(dbAdapter);
    return {
        getCourses: fn.getCourses,
        createCourse: fn.createCourse,
        getClassMembers: fn.getClassMembers,
        loadSchoolSessions: fn.loadSchoolSessions,
        getThreads: fn.getThreads ,
        getPosts: fn.getPosts,
        createPost: fn.createPost,
        editPost: fn.editPost
    };
};

