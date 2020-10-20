const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", function(err) {
    if (err) {
        console.log("Error occured in creating the database.");
    }
    db.run(
        "CREATE TABLE issues(id INTEGER PRIMARY KEY,head TEXT NOT NULL,description TEXT NOT NULL,status INTEGER NOT NULL);",
        function(err) {
            if (err) {
                console.log(err.message);
            } else {
                console.log("Table created");
            }
        }
    );
    console.log("Database created");
});

module.exports = db;