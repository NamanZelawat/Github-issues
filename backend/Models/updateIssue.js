const db = require("./sql/connect");

function updateIssue(info) {
    return new Promise(function(resolve, reject) {
        db.all(
            "UPDATE issues SET head=?,description=?,status=? WHERE id=?", [info.head, info.descrition, info.status, info.id],
            function(err) {
                if (err) {
                    return reject({
                        success: false,
                    });
                }
                return resolve({
                    success: true,
                });
            }
        );
    });
}

module.exports = updateIssue;