const { updateBusinessProfileQuery, updateUser } = require("../db/query")
const { generalError } = require("../helpers/statusCodes")

exports.uploadBusinessPhotos = async (req, res, next) => {
    // just images
}

// not tested yet
exports.uploadBusinessProfileImage = async (req, res, next) => {
    const uid = req?.user?.uid
    const file = req.body.user_file
    try {
        await updateBusinessProfileQuery({ uid }, { profile_url: file })
    } catch (error) {
        console.log(error.message)
    }
    success(res, {}, "Business image updated")
}

exports.uploadProfileImage = async(req, res ,next) =>{
    const uid = req?.user?.uid
    const file = req.body?.img
    // console.log("body::: ",req?.body)
    if (!file){
        return generalError(res, "File required.")
    }
    try {
        await updateUser({ uid }, { profile_url: file })
    } catch (error) {
        console.log(error.message)
        return generalError(res, "Error while uploading file")
    }
    success(res, {}, "Profile image updated")
}