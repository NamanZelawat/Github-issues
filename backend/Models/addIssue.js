const db = require("./sql/connect");

function addIssue(info) {
    return new Promise(function(resolve, reject) {
        db.run(
            "INSERT into issues(head,description,status) values(?,?,?)", [info.head, info.description, 0],
            function(err) {
                if (err) {
                    return reject({
                        success: false,
                        err: err,
                    });
                }
                return resolve({
                    success: true,
                });
            }
        );
    });
}

module.exports = addIssue;