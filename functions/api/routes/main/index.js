const express = require('express');
const router = express.Router();

router.get('/', require('./mainGET'));
router.get('/tag', require('./mainTagGET'));

module.exports = router;
