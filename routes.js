const {Router} = require("express")
const {createAccount, signin, requestPasswordReset, sendVerification, updatePassword, verify} = require("./controllers/baseController");
const { updateBusinessProfile, getStoreCategories, fetchBusinessProfile, createBusiness, uploadBusinessProfileImage, uploadBusinessHours } = require("./controllers/storeController");
const { baseAuth, busAuth } = require("./helpers/middleware/auth");
const { profileuploadMiddleware } = require("./helpers/middleware/image");

const router = Router();

router.post("/auth/createAccount", createAccount)
router.post("/auth/signin", signin)
router.post("/auth/passwordReset", requestPasswordReset)
router.post('/auth/password/update', updatePassword)

router.get("/business/category/fetch", getStoreCategories)
router.put("/business/profile/update", busAuth, updateBusinessProfile)
router.get("/business/profile/fetch", busAuth, fetchBusinessProfile)
router.post("/business/profile/create", baseAuth, createBusiness)
router.post("/business/profile/photo/upload", busAuth, profileuploadMiddleware, uploadBusinessProfileImage)
router.post("/business/profile/businesshour/upload", busAuth, uploadBusinessHours)

exports.router = router