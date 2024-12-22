const { P } = require("../helpers/consts")
const { reVerificationTag } = require("../helpers/util")
const { User, Business, BusinessHours, Product, Verifications, Review } = require("./model")

exports.createUser = async (data) => {
    return await User.create(data)
}

exports.getUser = async (query) => {
    return User.findOne({ "where": query })
}

exports.getUserWithSpecificAttributes = async (query, attributes) => {
    return User.findOne({ "where": query , attributes:attributes})
}

exports.updateUser = async (query, update) => {
    return User.update(update, { where: query })
}

exports.updateBusinessProfileQuery = async (query, update) => {
    return await Business.update(update, { where: query })
}

exports.fetchBusinessProfileQuery = async (query, attributes) => {
    return await Business.findOne({ where: query, attributes: attributes, include: { model: BusinessHours, required: false, attributes: ["businessId", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"] } })
}

exports.getAllBusiness = async (offset, limit) => {
    const specBusinessHour = new Date().getUTCDay() // to get specific day to avoid fetching all days.
    const allDays = {
        0:"Sun",
        1:"Mon",
        2:"Tue",
        3:"Wed",
        4:"Thur",
        5:"Fri",
        6:"Sat"
    }
    
    return Business.findAll(
        {
            attributes: [P.name, P.profile_url, P.website_url, P.total_reviews, P.review_count, P.id],
            include: [
                {
                    model: Review,
                    attributes: [P.review, P.rating]
                },
                {
                    model: BusinessHours,
                    attributes:[`${allDays[specBusinessHour]}`]
                }
            ],
            limit,
            offset
        }
    )
}

exports.createBusinessProfile = async (data) => {
    return await Business.create(data)
}

exports.updateBusinessProfileQuery = async (query, update) => {
    return await Business.update(update, { where: query })
}

exports.uploadBusinessHourQuery = async (data) => {
    return await BusinessHours.create(data)
}

exports.updateBusinessHourQuery = async (business_id, update) => {
    return await BusinessHours.update(update, { where: { businessId: business_id } })
}

exports.createCatalogue = async (catalogue_data) => {
    return await Product.create(catalogue_data)
}

exports.getCatalogue = async (bus_id, limit, offset) => {
    return await Product.findAll(
        {
            where: {
                businessId: bus_id
            },
            attributes: [P.id, P.name, P.price, P.imageList, P.description],
            limit: limit,
            offset: offset
        }
    )
}

exports.updateCatalogue = async (cat_id, bus_id, catalogue_update) => {
    return await Product.update(catalogue_update, { where: { id: cat_id, businessId: bus_id } })
}

exports.deleteCatalogue = async (cat_id, business_id) => {
    return await Product.destroy({ where: { id: cat_id, businessId: business_id } })
}

exports.createReview = async (data) => {
    return await Review.create(data)
}

exports.getAllReviewsForBusiness = async(bid, limit, offset) =>{
    return await Review.findAll(
        {
            where:{businessId:bid},
            attributes:[P.id, P.review, P.rating, P.reply, P.createdAt],
            include:[{
                model:User,
                attributes:[P.first_name, P.last_name, P.profile_url, P.uid],
                as:"reviewer"
            }],
            limit, 
            offset
        }
    )
}

exports.getSpecificReview = async(bid, review_id) =>{
    return await Review.findOne({where:{businessId:bid, id:review_id}})
}

exports.addReplyToReview = async(rid, bId, reply) => {
    return await Review.update({reply:reply}, {where:{id:rid, businessId:bId}})
}

exports.getBusinessUserDashboard = async (category, skip) => {
    await Business.findAll({ where: {}, limit: 10, offset: skip })
}

exports.createVerificationTagForUser = async (email) => {
    const ext = reVerificationTag()
    try {
        await Verifications.create({ email: email, tag: ext })
    } catch (error) {
        await Verifications.update({ tag: ext }, { where: { email } })
    }
    return ext
}

exports.getUserByVerificationtag = async (tag) => {
    return await Verifications.findOne(
        {
            where: { "tag": tag }
        }
    )

}