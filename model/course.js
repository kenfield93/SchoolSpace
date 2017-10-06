/**
 * Created by kyle on 9/15/17.
 */

const courseModel = {};
import dbPool from './database';
const loginInfoTable = 'login';
const userTable = 'users';
const userToClassTable = 'usertoclass';
const courses = 'class';


courseModel.createCourse = (orgId, title, ssId) => {
    let ssIdLabelSql = "", ssIdValueSql = "";
    if(ssId){
        ssIdLabelSql = ", ssId ";
        ssIdValueSql = ", $3";
    }
    const sql =
        `INSERT INTO ${courses} (orgId, title ${ssIdLabelSql} ) ` +
        ` VALUES ( $1, $2 ${ssIdValueSql} ) `
    ;
    return dbPool.preparedquery(sql, [orgId, title, ssId], function(err, result){
        return !!err;
    });
};
// todo: refactor for pagination (get first 10, then next 10 and so on)
courseModel.getThreadPosts = () => {
    var sql =

        "SELECT p.postId as id, postText, responseToPostId, postTime, likeCnt, name " +
        "FROM (thread AS t INNER JOIN users as u " +
        "ON t.usrId = u.usrId ) AS usrThread " +
        "INNER JOIN post AS p " +
        "ON p.thrId = usrThread.thrId " +
        "ORDER BY p.responseToPostId , p.postTime"
    ;
    return dbPool.query(sql, function(err, result){
        return (err) ? false : result.rows;
    });
};
export default courseModel;
