const express = require("express");
const router = express.Router();
const addIssue = require("./addIssue");
const deleteIssues = require("./deleteIssues");
const updateIssues = require("./updateIssues");
const all = require("./all");
const listIssues = require("./listIssues");

router.use("/", all);
router.use("/add-issue", addIssue);
router.use("/list-issues", listIssues);
router.use("/update-issue", updateIssues);
router.use("/delete-issue", deleteIssues);

console.log("routes created")

module.exports = router;