// django code

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
