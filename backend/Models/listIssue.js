const db = require("./sql/connect");

function listIssue(id) {
    return new Promise(function(resolve, reject) {
        db.all("SELECT * from issues WHERE id=?", [id], function(err, data) {
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

module.exports = listIssue;