const express = require("express");
const router = express.Router();
const listIssues = require("./../../Models/listIssues");
const listIssue = require("./../../Models/listIssue");

router.get("/", function(req, res) {
    if (req.query.page) {
        listIssues(req.query.page)
            .then(function(data) {
                res.json({ success: true, data: data.data });
            })
            .catch(function(err) {
                success: false;
            });
    } else if (req.query.id) {
        listIssue(req.query.id)
            .then(function(data) {
                res.json({ success: true, data: data.data });
            })
            .catch(function(err) {
                success: false;
            });
    } else {
        res.redirect("/list-issues?page=1");
    }
});

module.exports = router;