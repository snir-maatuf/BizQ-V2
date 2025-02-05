const express = require('express');
const { registerBusiness } = require('../services/RegisterService');

const router = express.Router();

router.post('/', registerBusiness);

module.exports = router;
