const {Router} = require("express")
const {createAccount, signin, requestPasswordReset, sendVerification, updatePassword, verify} = require("./controllers/baseController")

const router = Router();

router.post("/auth/createAccount", createAccount)
router.post("/auth/signin", signin)
router.post("/auth/passwordReset", requestPasswordReset)
router.post('/auth/password/update', updatePassword)

exports.router = router