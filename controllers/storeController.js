const { fetchBusinessProfileQuery, createBusinessProfile } = require("../db/query")
const { P } = require("../helpers/consts")
const { success, generalError, notAcceptable, created } = require("../helpers/statusCodes")
const { businessProfileValidator } = require("../helpers/validator")

exports.updateBusinessProfile = async(req, res, next) =>{

    const uid = req?.user?.uid
    const validator = businessProfileValidator.validate(req.body)
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
    const uid = req?.user?.uid //user id
    const busProfile = await fetchBusinessProfileQuery({uid}, [P.description, P.address, P.profile_url, P.name, P.category])
    success(res, busProfile?busProfile:{}, "")
}

exports.createBusiness = async(req, res,next) =>{
    const uid = req?.user?.uid //user id
    
    const validator = businessProfileValidator.validate(req.body)
    // console.log(validator)
    if(validator?.error?.message){
        return notAcceptable(res, validator.error.message.replace(/['"]/g, ''))
    }

    const busProfile = await fetchBusinessProfileQuery({uid}, [P.id])
    if (busProfile){
        return generalError(res, "User has exisiting business already")
    }
    req.body.uid = uid
    await createBusinessProfile(req.body)
    created(res, "Business profile created")




}