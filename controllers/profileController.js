// django code

const { getUser, getUserWithSpecificAttributes, updateUser } = require("../db/query")
const { P } = require("../helpers/consts")
const { success, generalError } = require("../helpers/statusCodes")
const { profileValidator } = require("../helpers/validator")

// @api_view(["GET"])
// @authentication_classes([JWTAuthentication])
// def get_profile(request:HttpRequest):
//     user =  UserSerializer(request.user).data
//     user_profile = ProfileSerializer(Profile.objects.get(user=user.get("id")))
//     data =  user_profile.data
//     # data["x"] = request.build_absolute_uri(f'api/{user_profile.data["profile_url"]}')
//     data["profile_url"] = resolve_url(request.get_host() + user_profile.data["profile_url"])
    

//     # print(os.path.join(request.get_host(), user_profile.data["profile_url"]))
    
//     return Response(data, status.HTTP_200_OK)

// @api_view(["PUT"])
// @authentication_classes([JWTAuthentication])
// def update_profile(request:HttpRequest):
//     user =  UserSerializer(request.user).data
//     data = request.data
//     profile =  Profile.objects.get(user = user.get("id"))
    
//     update = ProfileSerializer(profile, data)

//     if update.is_valid():
//         update.save()
//         return Response({"message":"Profile updated"}, status.HTTP_200_OK)

//     return Response({"message":"Unable to update profile"}, status.HTTP_400_BAD_REQUEST)


exports.fetchProfile = async(req, res, next) =>{
    const user = await getUserWithSpecificAttributes({uid:req?.user?.uid }, [P.first_name, P.last_name, P.email, P.alias, P.gender, P.profile_url])

    return success(res, user,"")
}

exports.updateProfile = async(req, res, next) =>{
    const valid_ = profileValidator.validate(req?.body)

    if (valid_?.error){
        return generalError(res, valid_?.error?.message.replace(/['"]/g, ''))
    }

    const update = await updateUser({uid: req?.user?.uid}, req?.body )
    if (! update){
        return generalError(res, "No change detected")
    }
    return success(res, {}, "Profile updated")
}