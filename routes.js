const { Router } = require("express")
const { createAccount, signin, requestPasswordReset, sendVerification, updatePassword, verify, resendLink } = require("./controllers/authController");
const { updateBusinessProfile, getStoreCategories, fetchBusinessProfile, createBusiness, uploadBusinessHours, fetchBusinesses } = require("./controllers/businessController");
const { baseAuth, busAuth } = require("./helpers/middleware/auth");
const { profileuploadMiddleware } = require("./helpers/middleware/image");
const { uploadBusinessProfileImage } = require("./controllers/imageController");
const { uploadCatalogue, fetchCatalogueList, editCatalogue } = require("./controllers/catalogueController");
const { uploadReview, fetchReviews, replyReviews } = require("./controllers/reviewsController");
const { fetchProfile } = require("./controllers/profileController");

const router = Router();

router.post("/auth/createAccount", createAccount)
router.post("/auth/signin", signin)
router.post("/auth/passwordReset", requestPasswordReset)
router.post('/auth/password/update', updatePassword)
router.get("/auth/verify", verify)
router.get("/auth/verify/resend", resendLink)

router.get("/profile/fetch", baseAuth, fetchProfile)

router.get("/business/fetch", fetchBusinesses)

router.get("/business/category/fetch", getStoreCategories)
router.patch("/business/profile/update", busAuth, updateBusinessProfile)
router.get("/business/profile/fetch", busAuth, fetchBusinessProfile)
router.post("/business/profile/create", baseAuth, createBusiness)
router.post("/business/profile/photo/upload", busAuth, profileuploadMiddleware, uploadBusinessProfileImage)
router.post("/business/profile/businesshour/upload", busAuth, uploadBusinessHours)

router.post("/business/catalogue/upload", busAuth, uploadCatalogue)
router.get("/business/catalogue/fetch", busAuth, fetchCatalogueList)

router.post("/review/create/:bus_id", busAuth, uploadReview)
router.get("/review/fetch/:type", busAuth, fetchReviews)
router.get("/review/create", baseAuth, uploadReview)

router.post("/review/reply/create", busAuth, replyReviews)
router.patch("/review/reply/edit", busAuth, replyReviews)

// router.put("/business/catalogue/update", busAuth, editCatalogue)
exports.router = router
