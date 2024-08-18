const {User, Business} = require("./model")

exports.createUser = async (data) =>{
    return await User.create(data)
}

exports.getUser = async(query) =>{
    return User.findOne({"where":query})
}

exports.updateUser = async(query, update) =>{
    return User.update(update, {where:query})
}

exports.updateBusinessProfileQuery = async (query, update) =>{
    return await Business.update(update, {where:query})
}

exports.fetchBusinessProfileQuery = async (query, attributes) =>{
    return await Business.findOne({where:query, attributes:attributes})
}

