const { success, generalError, notAcceptable } = require("../helpers/statusCodes")
const { businessProfileValidator } = require("../helpers/validator")

exports.updateBusinessProfile = async(req, res, next) =>{
    const validator = businessProfileValidator.validate(req.body, {})
    // console.log(validator)
    if(validator?.error?.message)return notAcceptable(res, validator.error.message.replace(/['"]/g, ''))
    success(res, {}, "sasdasda")
}

exports.getStoreCategories = async(req, res, next) =>{
    const categories = ["Mass Media", "Local Flavour", "Bicycles", 
    "Event Planning and Services", "Public Services & Government", 
    "Financial Services", "Home Services", "Arts & Entertainment", 
    "Pets", "Hotels & Travels", "Health & Medical", 
    "Automotive", "Religious Organizations", "Restaurants", 
    "Food", "Beauty & Spas", "Nightlife", 
    "Professional Services", "Education", 
    "Shopping", "Local Services", "Active Life"]

    return success(res, categories, "")
}

exports.fetchBusinessProfile = async(req, res, next) =>{

}