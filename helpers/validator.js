const joi = require("joi")

exports.businessProfileValidator = joi.object({
    name: joi.string().min(2).messages({
        "string.min": "Business name cannot be less that 2 characters"
    }),
    company_email: joi.string().pattern(new RegExp(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)).messages({
        "string.pattern.base": "Valid company email required"
    }),
    category: joi.array().min(1).messages({
        "array.min": "Select at least one business category",
        "array.base": "category to be passed as array"
    }),
    phone: joi.string().pattern(new RegExp("^(234|0)\\d{9,15}$")).message("Valid phone number required"),
    description: joi.string(),
    website_url: joi.string().pattern(new RegExp(`^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$`)).message("Valid website url required"),
    address: joi.string(),
    profile_url: joi.string()
})

exports.businessHourValidator = joi.object({
    "Mon": joi.object({ open_hour: joi.string().pattern(new RegExp(`^(0[1-9]|1[0-2]):[0-5][0-9] ?[AaPp][Mm]$`)), close_hour: joi.string().pattern(new RegExp(`^(0[1-9]|1[0-2]):[0-5][0-9] ?[AaPp][Mm]$`))}),
    "Tue": joi.object({ open_hour: joi.string().pattern(new RegExp(`^(0[1-9]|1[0-2]):[0-5][0-9] ?[AaPp][Mm]$`)), close_hour: joi.string().pattern(new RegExp(`^(0[1-9]|1[0-2]):[0-5][0-9] ?[AaPp][Mm]$`))}),
    "Wed": joi.object({ open_hour: joi.string().pattern(new RegExp(`^(0[1-9]|1[0-2]):[0-5][0-9] ?[AaPp][Mm]$`)), close_hour: joi.string().pattern(new RegExp(`^(0[1-9]|1[0-2]):[0-5][0-9] ?[AaPp][Mm]$`))}),
    "Thur": joi.object({ open_hour: joi.string().pattern(new RegExp(`^(0[1-9]|1[0-2]):[0-5][0-9] ?[AaPp][Mm]$`)), close_hour: joi.string().pattern(new RegExp(`^(0[1-9]|1[0-2]):[0-5][0-9] ?[AaPp][Mm]$`))}),
    "Fri": joi.object({ open_hour: joi.string().pattern(new RegExp(`^(0[1-9]|1[0-2]):[0-5][0-9] ?[AaPp][Mm]$`)), close_hour: joi.string().pattern(new RegExp(`^(0[1-9]|1[0-2]):[0-5][0-9] ?[AaPp][Mm]$`))}),
    "Sat": joi.object({ open_hour: joi.string().pattern(new RegExp(`^(0[1-9]|1[0-2]):[0-5][0-9] ?[AaPp][Mm]$`)), close_hour: joi.string().pattern(new RegExp(`^(0[1-9]|1[0-2]):[0-5][0-9] ?[AaPp][Mm]$`))}),
    "Sun": joi.object({ open_hour: joi.string().pattern(new RegExp(`^(0[1-9]|1[0-2]):[0-5][0-9] ?[AaPp][Mm]$`)), close_hour: joi.string().pattern(new RegExp(`^(0[1-9]|1[0-2]):[0-5][0-9] ?[AaPp][Mm]$`))})
})

exports.catalogueUploadValidator = joi.object({
    "name":joi.string().required().messages(
        {
            "any.required":"'name' of product required",
            "string.empty":"'name' cannot be empty",
            "string.base":"use a valid string"
        }
    ),
    "price":joi.number().min(100).required().messages(
        {
            "any.required":"'price' of product required",
            "number.empty":"'price' cannot be empty",
            "number.base":"'price' must be a number",
            "number.min":"'price' must be greater than 100"     
        }
    ),
    "description":joi.string()
    // "images":joi.alternatives()
})

exports.catalogueUpdateValidator = joi.object({
    "name":joi.string().message("use a valid string"),
    "price":joi.number().min(100).messages({
        "number.empty":"price cannot be empty",
        "number.base":"price must be a number",
        "number.min":"'price' must be greater than 100"
    }),
    "description":joi.string()
})

exports.reviewUploadValidator = joi.object({
    rating:joi.number().required().message("rating required"),
    review: joi.string().required().message("kindly leave a review")
})