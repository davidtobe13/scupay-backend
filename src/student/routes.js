const express = require('express');
const { studentSignup } = require('./controllers');

const router = express.Router();

router.post('/signup/:id', studentSignup);



module.exports = router;   
