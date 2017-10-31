/**
 * Created by kyle on 9/15/17.
 */

const courseModel = {};
import dbPool from './database';
const loginInfoTable = 'login';
const users = 'users';
const userToClassTable = 'usertoclass';
const courses = 'class';
const threads = 'thread';
const schoolSessions = 'schoolsession';
const posts = 'post';

const postIdAlias = 'id';
const postTextAlias = 'text';

courseModel.getCourses = (userId) => {
    const sql =
            " SELECT C.classid, classname, ssid " +
            `FROM ${userToClassTable} as UtoC INNER JOIN ${courses} as C` +
            " ON UtoC.classId = C.classId " +
            " WHERE UtoC.usrId = $1"
        ;
    return dbPool.preparedquery(sql, [userId], (err, result) => {
        if(err || !result.rows[0]){
            return false;
        }
        return result.rows;
    });
};

courseModel.createCourse = ( title, usrId, ssId, orgId) => {
    let ssIdLabelSql = "", ssIdValueSql = "";
    if(!isNaN(ssId)){
        ssIdLabelSql = ", ssId ";
        ssIdValueSql = ", $4";
    }
    const sql =
        "WITH newClass as( " +
        ` INSERT INTO ${courses} (orgId, classname ${ssIdLabelSql} ) ` +
        ` VALUES ( $1, $2 ${ssIdValueSql}) ` +
        " RETURNING classid ) " +

        ` INSERT INTO ${userToClassTable} (usrid, classid) ` +
        " VALUES ( $3, (SELECT classid from newClass)) RETURNING classid ; "
    ;
    return dbPool.preparedquery(sql, [orgId, title, usrId, (!isNaN(ssId)) ? ssId : null], function(err, result){
        return (err) ?  false : result.rows[0];
    });
};

courseModel.loadSchoolSessions = (orgId) => {
    var sql =
        "SELECT ssid, name as session " +
        ` FROM ${schoolSessions} WHERE orgId = $1`
    ;

    return dbPool.preparedquery(sql, [orgId], function(err, result){
        if( err || result.rows.length == 0)
            return false;
        return result.rows;
    });
};
courseModel.getPosts = (thrId) => {
    var sql =
        "SELECT tp.id, text, responseToPostId, postTime, likeCnt, name, u.usrId AS usrId " +
        "FROM ( SELECT p.usrId AS usrId, p.responseToPostId, p.postText as text, p.postId as id, p.postTime, p.likeCnt " +
        `FROM ${posts} p INNER JOIN ${threads} t ` +
        "ON p.thrId = t.thrId " +
        "WHERE p.thrId = $1 " +
        ") AS tp " +
        `INNER JOIN ${users} u ` +
        "ON u.usrId = tp.usrId " +
        "ORDER BY tp.responseToPostId DESC, tp.postTime ; "
    ;

    return dbPool.preparedquery(sql, [thrId], function(err, result){
        return (err) ? false : result.rows;
    });
};

// todo: refactor for pagination (get first 10, then next 10 and so on)
courseModel.getThreads = (classId) => {
    var sql =
        "SELECT thread.title, thread.id, p.posttext as text " +
        "FROM (SELECT title, t.thrid as id, mainpostid " +
                `FROM ${threads} t INNER JOIN ${courses} c ` +
                    "ON t.classid = c.classid " +
                "WHERE t.classid = $1" +
                "LIMIT 10 " +
             `) as thread LEFT OUTER JOIN ${posts} p ` +
             "ON thread.mainpostid = p.postid; "
    ;

    return dbPool.preparedquery(sql, [classId], function(err, result){
       return (err) ? false : result.rows;
    });
};

courseModel.createPost = ({usrId, threadId, responseToId, text}) => {
    var sql =
        `INSERT INTO ${posts} (usrId, thrId, responsetopostid, postText) ` +
        ` VALUES ($1, $2, $3, $4) RETURNING postId AS ${postIdAlias} , postText AS ${postTextAlias}, responseToPostId, postTime, likeCnt, null AS name ;`
    ;

    return dbPool.preparedquery(sql, [usrId, threadId, responseToId, text], function(err, result){
       return (err) ? false : result.rows[0];
    });
};
courseModel.editPost  = (userId, postId, text) => {
    var sql =
        `UPDATE ${posts} SET postText = $1 ` +
        "WHERE usrId = $2 AND postId = $3"
    ;

    return dbPool.preparedquery(sql, [text, userId, postId], function(err, result){
         return (err) ? false : text
    });
};

export default courseModel;
