const express = require("express");
const router = express.Router();
const updateIssue = require("./../../Models/updateIssue");

router.patch("/:id", function(req, res) {
    console.log("in it");
    info = {
        id: req.params.id,
        head: req.body.head,
        descrition: req.body.description,
        status: req.body.status
    };
    console.log(info)
    updateIssue(info)
        .then(function(data) {
            console.log("update success")
            res.json({
                success: true,
            });
        })
        .catch(function(err) {
            res.json({
                success: false,
            });
        });
});

module.exports = router;