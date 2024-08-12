const {Router} = require("express")
const {createAccount, signin, requestPasswordReset, sendVerification, updatePassword, verify} = require("./controllers/baseController")

const router = Router();

router.post("/auth/createAccount", createAccount)
router.post("/auth/signin", signin)

exports.router = router