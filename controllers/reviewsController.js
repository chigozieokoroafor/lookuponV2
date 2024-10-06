// fetch reviews, business and user
// create reviews, user...

const { generalError } = require("../helpers/statusCodes")
const { reviewUploadValidator } = require("../helpers/validator")

exports.createReview = async(req, res, next) =>{
    const business_id = req?.params?.bus_id
    const reviewer_id = req?.user?.uid
    {
        business_id,
        reviewer_id,
        rating,
        review
    }
    const valid_ = reviewUploadValidator.validate(req?.body)
    if (valid_?.error){
        return generalError(res, valid_?.error?.message)
    }

    if (business_id == req?.user?.bus?.id){ // can't review self business
        return generalError(res, "He he he....")
    }

    
}