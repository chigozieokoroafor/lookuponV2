// fetch reviews, business and user
// create reviews, user...

const { createReview, getAllReviewsForBusiness, getSpecificReview, addReplyToReview } = require("../db/query")
const { P } = require("../helpers/consts")
const { generalError, success, internalServerError, unAuthorized } = require("../helpers/statusCodes")
const { reviewUploadValidator } = require("../helpers/validator")

exports.uploadReview = async (req, res, next) => {
    const businessId = req?.params?.bus_id
    const reviewer_id = req?.user?.uid

    // console.log(business_id)
    try {
        const valid_ = reviewUploadValidator.validate(req?.body)
        if (valid_?.error) {
            return generalError(res, valid_?.error?.message)
        }

        if (businessId == req?.user?.bus?.id) { // can't review self business
            return generalError(res, "He he he 😈😈👻....Psych, you can't leave a review for your business.")
        }

        const uploadedData = {
            businessId,
            reviewer_id,
            ...req?.body
        }

        await createReview(uploadedData)

        // add a trigger to recalculate total rating for user.

        return success(res, {}, "Review added 🎉🎉")
    } catch (error) {
        console.log("error on upload review::::", error)
        return internalServerError(res, "Internal server error")
    }
}

exports.fetchReviews = async (req, res, next) => {
    const {type} = req?.params
    const x = ["user", "business"]
    
    if (! x.includes(type)){
        return generalError(res, "'type' can only be of 'user' or 'business'")
    }
    let bus_id
    
    if (type == x[0]){
        bus_id = req?.query?.bus_id
        console.log("bus:::", bus_id)
        
    }else{
        bus_id = req?.user?.bus?.id
    }

    if (!bus_id){
        return generalError(res, "Kindly select a business.")
    }
    
    const data = await getAllReviewsForBusiness(bus_id)

    return success(res, data, "")
}

exports.replyReviews = async (req, res, next) =>{

    
    const review_id = req?.query?.review
    const reply = req?.body?.reply
    if (!review_id) {
        return generalError(res, "Kindly select a review to reply.")
    }

    if (!reply){
        return generalError(res, "Kindly provide a reply.")
    }

    const bus_id = req?.user?.bus?.id
    if (!bus_id){
        return generalError(res, "User not a business.")
    }
    getSpecificReview(bus_id, review_id)
    .then(async data =>{
        if (!data){
            return generalError(res, "Kindly select a valid review")
        }

        await addReplyToReview(review_id, bus_id, reply)

        if (req?.method == "PATCH"){
            return success(res, {}, "Reply updated")
        }else{
            return success(res, {}, "Reply added")
        }

        
        
    })

}