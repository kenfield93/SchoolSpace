/**
 * Created by kyle on 9/13/17.
 */
/**
 * Created by kyle on 9/10/16.
 */
import config from '../tools/config';
//const pg = require('pg');
import pg from 'pg';
const dbConfig = config.dbConfig;
const pool = new pg.Pool(dbConfig);
pool.on('error', (err, client) => {
   console.log("PG Error %s ", JSON.stringify(client));
});


const organization = () => {
    return (
        "CREATE TABLE organization( " +
         "orgId SERIAL PRIMARY KEY, " +
        "title TEXT UNIQUE NOT NULL, " +
         "email TEXT NOT NULL);"
    );
};
const schoolSession = () => {
    return(
        "CREATE TABLE schoolsession( " +
        "ssId SERIAL PRIMARY KEY, " +
        "name TEXT, " +
        "starttime TIMESTAMP );"
    );
};
const schoolClass = () => {
    return(
        "CREATE TABLE class(" +
        "classId SERIAL PRIMARY KEY, " +
        "orgId INTEGER NOT NULL REFERENCES organization(orgId), " +
        "className TEXT NOT NULL, " +
        "ssId INTEGER REFERENCES schoolsession(ssId) );"
    );
};

const teacher = () => {
    return(
        "CREATE TABLE teacher(" +
        "teaId SERIAL PRIMARY KEY);"
    );
};
const student = () => {
    return(
        "CREATE TABLE student(" +
        "stuId SERIAL PRIMARY KEY); "
    );
};
const userToClass = () => {
    return(
      "CREATE TABLE userToClass( " +
      " classId INTEGER NOT NULL REFERENCES class(classId), " +
      " usrId INTEGER NOT NULL REFERENCES users(usrId) );"
    );
};
/*
const studentToClass = () => {
    return(
        "CREATE TABLE studentToClass( " +
        " classId INTEGER NOT NULL REFERENCES class(classId), " +
        " stuId   INTEGER NOT NULL REFERENCES student(stuId) );"
    );
};*/

//TODO thing about extracting out email to seperate table
const users = () => {
    /* Maybe make teaId, stuId mandatory then have a teacher & student w/ id=0 that represents null, if it simplifies queries*/
    return(
        //user is key word in psql
        "CREATE TABLE users( " +
        " usrId SERIAL PRIMARY KEY, " +
        " teaId INTEGER REFERENCES teacher(teaId), " +
        " stuId INTEGER REFERENCES student(stuId), " +
        " name TEXT NOT NULL, " +
        " email TEXT NOT NULL UNIQUE);"
    );
};

const login = () => {

    return (
        "CREATE TABLE login( " +
        " email TEXT REFERENCES users(email), " +
        " salt TEXT NOT NULL CHECK(length(salt) >= 6), " +
        " password TEXT NOT NULL CHECK(length(password) >= 8) );"
    );
};

const topic = () => {

    return(
        "CREATE TABLE topic( " +
        " topId SERIAL PRIMARY KEY, " +
        " Name varchar(20) );"
    );
};

/*Note need to do something for thread/post when creating tables since they both ref eachother
* I manually commented out mainPostId, and then altered table to add it once post table was created
* ALTER TABLE thread ADD COLUMN mainPostId INTEGER REFERENCES post(postId);
* */
const thread = () => {

    return(
        "CREATE TABLE thread( " +
        " thrId SERIAL PRIMARY KEY, " +
        " classId INTEGER REFERENCES class(classId) NOT NULL, " +
        " usrId INTEGER REFERENCES users(usrId) NOT NULL, " +
        " title varchar(50) NOT NULL CHECK(length(title) > 5 ), " +
        " mainPostId INTEGER REFERENCES post(postId),  " +
        " UNIQUE(title, classId) );"

    );
};

const category = () => {

    return(
        "CREATE TABLE category(" +
        " topId INTEGER REFERENCES topic(topId) ); "
    );
};

//think about making an index over usrId

const post = () => {

    return(
        "CREATE TABLE post(" +
        " postId SERIAL PRIMARY KEY, " +
        " usrId INTEGER REFERENCES users(usrId), " +
        " thrId INTEGER REFERENCES thread(thrId), " +
        " postText text NOT NULL CHECK(length(postText)>1), " +
        " responseToPostId INTEGER REFERENCES post(postId), " +
        " postTime timestamp DEFAULT current_timestamp " +
        " likeCnt INTEGER ); "
    );
};

export default
{
    preparedquery: (text, values, cb) => {
        return pool.connect().then(function (client) {
            return new Promise(function (resolve, reject) {
                client.query(text, values, function (err, result) {
                    var outcome = cb(err, result);
                    if (outcome == false || outcome == null) {
                        reject(err);
                    }
                    else {
                        resolve(outcome);
                    }
                });
                client.release();
            });
        });
    },
    query: (text,  cb) => {
        return pool.connect().then(function (client) {
            return new Promise(function (resolve, reject) {
                client.query(text, function (err, result) {
                    var outcome = cb(err, result);
                    if (outcome == false || outcome == null) {
                        reject(err);
                    }
                    else {
                        resolve(outcome);

                    }
                });
                client.release();
            });
        });
    }
}
