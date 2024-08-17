const {Router} = require("express")
const {createAccount, signin, requestPasswordReset, sendVerification, updatePassword, verify} = require("./controllers/baseController");
const { updateBusinessProfile, getStoreCategories } = require("./controllers/storeController");

const router = Router();

router.post("/auth/createAccount", createAccount)
router.post("/auth/signin", signin)
router.post("/auth/passwordReset", requestPasswordReset)
router.post('/auth/password/update', updatePassword)

router.get("/category/fetch", getStoreCategories)
router.put("/business/profile/update", updateBusinessProfile)
router.get("/business/profile/fetch", )

exports.router = router