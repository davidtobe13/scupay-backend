const express = require('express');

const router = express.Router();
const { signUp, login, logOut, getOne, createPin, profileImage, verifyUser, getAllTransactions } = require('../controllers/userController');
const authorization = require('../middleware/authorization');
const validation = require('../validation/validation');
const upload = require('../utils/multer');
const { universalLogin } = require('../controllers/adminController');

router.post('/signup', validation, signUp);

router.get('/verify-user/:id/:token', verifyUser);

router.post('/login', universalLogin)

router.post('/logout', authorization.authenticate, logOut);


router.get('/getone', authorization.authenticate, getOne);


router.put('/createpin', authorization.authenticate, createPin)


router.put('/profileimage', authorization.authenticate, upload.single('profileImage'), profileImage)

router.get('/getalltransaction', authorization.authenticate, getAllTransactions)


module.exports = router;   
