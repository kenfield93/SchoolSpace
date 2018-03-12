import pg from 'pg';

export default (dbConfig) =>
{
    const pool = new pg.Pool(dbConfig);
    pool.on('error', (err, client) => {
        console.log("PG Error %s ", JSON.stringify(client));
    });

    return {
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
        query: (text, cb) => {
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
    };
}
