exports.uploadBusinessPhotos = async(req, res, next) =>{
    // just images
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