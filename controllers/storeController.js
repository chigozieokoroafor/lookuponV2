const { fetchBusinessProfileQuery, createBusinessProfile, updateBusinessProfileQuery, uploadBusinessHourQuery, updateBusinessHourQuery } = require("../db/query")
const { P } = require("../helpers/consts")
const { success, generalError, notAcceptable, created, newError, notModifiedError } = require("../helpers/statusCodes")
const { businessProfileValidator, businessHourValidator } = require("../helpers/validator")


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

exports.updateBusinessProfile = async(req, res, next) =>{
    const uid = req?.user?.uid
    const validator = businessProfileValidator.validate(req.body)
    // console.log(validator)
    if(validator?.error?.message){
        return notAcceptable(res, validator.error.message.replace(/['"]/g, ''))
    }
    const update = await updateBusinessProfileQuery({uid}, req.body)
    if (!update[0]){
        return notModifiedError(res)
    }
    
    success(res, {}, "Business profile updated")
}

// not tested yet
exports.uploadBusinessProfileImage = async(req, res, next) =>{
    const uid = req?.user?.uid
    const file = req.body.user_file
    try{
        await updateBusinessProfileQuery({uid}, {profile_url:file})
    }catch(error){
        console.log(error.message)
    }
    success(res,{},"Business image updated")
}

exports.uploadBusinessHours = async(req, res, next) =>{
    // console.log(req.user)
    const body =  req.body
    const validator = businessHourValidator.validate(body)
    if(validator.error){
        return notAcceptable(res, validator.error.message.replace(/['"]/g, ''))
    }
    console.log(req.user)
    // body.businessId = req?.user?.bus?.id
    if (!req?.user?.bus?.BusinessHour){
        await uploadBusinessHourQuery(body)
        return success(res, {}, "Business hours uploaded")
    }
    else{
      x = await updateBusinessHourQuery(req?.user?.bus?.BusinessHour?.businessId, body)  
      return success(res, {}, "Business hours updated")
    }
    
}

// upnext

// image upload

// Catalogue
