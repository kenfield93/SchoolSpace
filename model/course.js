/**
 * Created by kyle on 9/15/17.
 */

const courseModel = {};
import dbPool from './database';
const loginInfoTable = 'login';
const userTable = 'users';
const userToClassTable = 'usertoclass';
const courses = 'class';
const threads = 'thread';
const posts = 'post';

courseModel.createCourse = (orgId, title, ssId) => {
    let ssIdLabelSql = "", ssIdValueSql = "";
    if(ssId){
        ssIdLabelSql = ", ssId ";
        ssIdValueSql = ", $3";
    }
    const sql =
        `INSERT INTO ${courses} (orgId, title ${ssIdLabelSql} ) ` +
        ` VALUES ( $1, $2 ${ssIdValueSql} ;) `
    ;
    return dbPool.preparedquery(sql, [orgId, title, ssId], function(err, result){
        return !!err;
    });
};


courseModel.getThreadPosts = (thrId) => {
    var sql =
        "SELECT tp.id, text, responseToPostId, postTime, likeCnt, name " +
        "FROM ( SELECT p.usrId AS usrId, p.responseToPostId, p.postText as text, p.postId as id, p.postTime, p.likeCnt " +
        "FROM post p INNER JOIN thread t " +
        "ON p.thrId = t.thrId " +
        "WHERE p.thrId = $1 " +
        ") AS tp " +
        "INNER JOIN users u " +
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

export default courseModel;
