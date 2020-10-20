const db = require("./sql/connect");

function listIssues(page) {
    let st = page * 10 - 9,
        end = page * 10;
    return new Promise(function(resolve, reject) {
        db.all("SELECT * from issues WHERE id>=? AND id<=?", [st, end], function(
            err,
            data
        ) {
            if (err) {
                return reject({
                    success: false,
                });
            }
            return resolve({
                success: true,
                data: data,
            });
        });
    });
}

module.exports = listIssues;