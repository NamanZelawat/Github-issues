const express = require("express");
const router = express.Router();
const all = require("./../../Models/all")

router.get("/", function(req, res) {
    all().then(function(data) {
        res.json({
            success: true,
            data: data.data
        })
    }).catch(function(err) {
        res.json({
            success: false
        })
    })
});

module.exports = router;