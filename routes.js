const {Router} = require("express")
const {createAccount, signin, requestPasswordReset, sendVerification, updatePassword, verify, resendLink} = require("./controllers/baseController");
const { updateBusinessProfile, getStoreCategories, fetchBusinessProfile, createBusiness, uploadBusinessHours } = require("./controllers/businessController");
const { baseAuth, busAuth } = require("./helpers/middleware/auth");
const { profileuploadMiddleware } = require("./helpers/middleware/image");
const { uploadBusinessProfileImage } = require("./controllers/imageController");
const { uploadCatalogue, fetchCatalogueList, editCatalogue } = require("./controllers/catalogueController");

const router = Router();

router.post("/auth/createAccount", createAccount)
router.post("/auth/signin", signin)
router.post("/auth/passwordReset", requestPasswordReset)
router.post('/auth/password/update', updatePassword)
router.get("/auth/verify", verify)
router.get("/auth/verify/resend", resendLink)

router.get("/business/category/fetch", getStoreCategories)
router.put("/business/profile/update", busAuth, updateBusinessProfile)
router.get("/business/profile/fetch", busAuth, fetchBusinessProfile)
router.post("/business/profile/create", baseAuth, createBusiness)
router.post("/business/profile/photo/upload", busAuth, profileuploadMiddleware, uploadBusinessProfileImage)
router.post("/business/profile/businesshour/upload", busAuth, uploadBusinessHours)

router.post("/business/catalogue/upload", busAuth, uploadCatalogue)
router.get("/business/catalogue/fetch", busAuth, fetchCatalogueList)
// router.put("/business/catalogue/update", busAuth, editCatalogue)
exports.router = router