const express = require('express');
const { registerAdmin, universalLogin, getAllUsers, deleteUser, confirmDeposit, declineDeposit } = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/authorization');
const { verifyUser, creditDebit } = require('../controllers/userController');

const router = express.Router();


router.post('/admin-signup', registerAdmin);
router.post('/login', universalLogin);
router.put('/verify-user/:id', authenticateAdmin, verifyUser);
router.get('/all-users', authenticateAdmin, getAllUsers);
router.delete('/delete-user/:id', authenticateAdmin, deleteUser )
router.post('/confirmdeposit/:id', authenticateAdmin, confirmDeposit )
router.post('/declinedeposit/:id', authenticateAdmin, declineDeposit )
router.post('/debitorcredit/:id', authenticateAdmin, creditDebit )





module.exports = router;   
