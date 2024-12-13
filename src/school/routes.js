const express = require('express');
const { schoolSignup } = require('./controllers');

const router = express.Router();

router.post('/signup', schoolSignup);



module.exports = router;   
