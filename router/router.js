const express = require('express')
const router = express.Router();

const controller = require('../controller/controller.js')

router.get('/issueGet', controller.searchIssueGithub)

module.exports = router;