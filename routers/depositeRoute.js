const router = require("express").Router()
const { deposit, getAllDeposits } = require("../controllers/depositeCon")
const { authenticate, authenticateAdmin } = require("../middleware/authorization")
const upload = require("../utils/multer")

router.post("/deposit", authenticate, upload.single('image'), deposit)
router.get("/getalldeposit", authenticateAdmin, getAllDeposits)

module.exports = router