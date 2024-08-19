const {Router} = require("express")
const {createAccount, signin, requestPasswordReset, sendVerification, updatePassword, verify} = require("./controllers/baseController");
const { updateBusinessProfile, getStoreCategories, fetchBusinessProfile, createBusiness } = require("./controllers/storeController");
const { baseAuth } = require("./helpers/auth_middleware");

const router = Router();

router.post("/auth/createAccount", createAccount)
router.post("/auth/signin", signin)
router.post("/auth/passwordReset", requestPasswordReset)
router.post('/auth/password/update', updatePassword)

router.get("/business/category/fetch", getStoreCategories)
router.put("/business/profile/update", updateBusinessProfile)
router.get("/business/profile/fetch",baseAuth, fetchBusinessProfile)
router.post("/business/profile/create", baseAuth, createBusiness)

exports.router = router