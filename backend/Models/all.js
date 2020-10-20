const db = require("./sql/connect");

function all() {
    return new Promise(function(resolve, reject) {
        db.all("SELECT * from issues", [], function(
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

module.exports = all;