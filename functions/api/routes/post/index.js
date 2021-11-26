const express = require('express');
const router = express.Router();

router.get('/:postId', require('./detailGET'));
router.post('', require('./postPOST'))

module.exports = router;
