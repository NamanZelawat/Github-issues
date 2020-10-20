const express = require("express");
const router = express.Router();
const deleteIssue = require("./../../Models/deleteIssues");

router.delete("/:id", function(req, res) {
    deleteIssue(req.params.id)
        .then(function() {
            res.json({ success: true });
        })
        .catch(function(err) {
            res.json({ success: false });
        });
});

module.exports = router;