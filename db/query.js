const {User} = require("./model")

exports.createUser = async (data) =>{
    await User.create(data)
}

exports.getUser = async(query) =>{
    return User.findOne({"where":query})
}

