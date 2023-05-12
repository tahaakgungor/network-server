// routes.js

const express = require('express');
const router = express.Router();
const tftpController = require('../controllers/tftpController');

router.post('/upload', tftpController.uploadFile);

module.exports = router;
