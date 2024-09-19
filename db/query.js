const { P } = require("../helpers/consts")
const {User, Business, BusinessHours, Product} = require("./model")

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
    return await Business.findOne({where:query, attributes:attributes, include:{model:BusinessHours, required:false, attributes:["businessId", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]}})
}

exports.createBusinessProfile = async(data) =>{
    return await Business.create(data)
}

exports.updateBusinessProfileQuery = async(query, update) =>{
    return await Business.update(update, {where:query})
}

exports.uploadBusinessHourQuery = async(data) =>{
    return await BusinessHours.create(data)
}

exports.updateBusinessHourQuery = async(business_id, update) =>{
    return await BusinessHours.update(update, {where:{businessId:business_id}})
}

exports.createCatalogue = async(catalogue_data) =>{
    return await Product.create(catalogue_data)
}

exports.getCatalogue = async(bus_id, limit, offset) => {
    return await Product.findAll(
        {
            where:{
                businessId:bus_id
            }, 
            attributes:[P.id, P.name, P.price, P.imageList, P.description ],
            limit:limit, 
            offset:offset
        }
    )
}

exports.updateCatalogue = async(cat_id, catalogue_update) =>{
    return await Product.update(catalogue_update, {where:{id:cat_id}})
}

exports.deleteCatalogue = async(cat_id, business_id) =>{
    return await Product.destroy({where:{id:cat_id, businessId:business_id}})
}