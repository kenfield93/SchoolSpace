/**
 * Created by kyle on 9/27/17.
 */

const dbConfig = {
        user: 'kyle', //env var: PGUSER
        database: 'schoolspace', //env var: PGDATABASE
        host: 'localhost', // Server hosting the postgres database
        port: 5432, //env var: PGPORT
        max: 20, // max number of clients in the pool
        idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
};
const dbConnectionString =  process.env.DATABASE_URL || 'postgres://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.database;


module.exports = {
    port: process.env.PORT || 9000,
    host: process.env.HOST || 'localhost',
    dbConfig,
    dbConnectionString
 };

