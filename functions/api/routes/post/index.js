const express = require('express');
const router = express.Router();

router.get('/:postId', require('./detailGET'));

module.exports = router;
