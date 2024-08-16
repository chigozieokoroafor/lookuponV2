const {User} = require("./model")

exports.createUser = async (data) =>{
    return await User.create(data)
}

exports.getUser = async(query) =>{
    return User.findOne({"where":query})
}

exports.updateUser = async(query, update) =>{
    return User.update(update, {where:query})
}

