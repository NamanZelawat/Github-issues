const db = require("./sql/connect");

function deleteIssue(id) {
    return new Promise(function(resolve, reject) {
        db.all("DELETE FROM issues WHERE id=?", [id], function(err) {
            if (err) {
                return reject({
                    success: false,
                });
            }
            return resolve({
                success: true,
            });
        });
    });
}

module.exports = deleteIssue;