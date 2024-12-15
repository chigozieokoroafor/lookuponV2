// fetch reviews, business and user
// create reviews, user...

const { createReview } = require("../db/query")
const { generalError, success, internalServerError } = require("../helpers/statusCodes")
const { reviewUploadValidator } = require("../helpers/validator")

exports.uploadReview = async (req, res, next) => {
    const business_id = req?.params?.bus_id
    const reviewer_id = req?.user?.uid
    try {
        const valid_ = reviewUploadValidator.validate(req?.body)
        if (valid_?.error) {
            return generalError(res, valid_?.error?.message)
        }

        if (business_id == req?.user?.bus?.id) { // can't review self business
            return generalError(res, "He he he 😈😈👻....Psych, you can't leave a review for your business.")
        }

        const uploadedData = {
            business_id,
            reviewer_id,
            ...req?.body
        }

        await createReview(uploadedData)

        return success(res, {}, "Review added 🎉🎉")
    } catch (error) {
        console.log("error on upload review::::", error)
        return internalServerError(res, "Internal server error")
    }
}

exports.fetchReviews = async (req, res, next) => {
    // for business
    // for personal use
}

exports.deleteReviews = async (req, res, next) => {

}