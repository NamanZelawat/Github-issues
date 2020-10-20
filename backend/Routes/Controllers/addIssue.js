const express = require("express");
const router = express.Router();
const addIssue = require("./../../Models/addIssue");

router.post("/", function(req, res) {
    let info = {
        head: req.body.head,
        description: req.body.description,
    };
    addIssue(info)
        .then(function() {
            res.json({
                success: true,
            });
        })
        .catch(function(err) {
            res.json({
                success: false,
                err: err.err,
            });
        });
});

module.exports = router;