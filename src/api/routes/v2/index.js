const express = require('express');
const hikesRoute = require('./hikes.route');

const router = express.Router();

/**
 * GET v2/hikes
 */
router.use('/hikes', hikesRoute);

module.exports = router;
