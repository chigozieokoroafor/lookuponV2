const joi = require("joi")

exports.businessProfileValidator  = joi.object({
    name:joi.string().min(2).messages({
        "string.min":"Business name cannot be less that 2 characters"
    }),
    company_email:joi.string().pattern(new RegExp(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)).messages({
        "string.pattern.base":"Valid company email required"
    }),
    category:joi.string(),
    phone:joi.string().pattern(new RegExp("^(234|0)\\d{9,15}$")).message("Valid phone number required"),
    description:joi.string(),
    website_url:joi.string().pattern(new RegExp(`^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$`)).message("Valid website url required"),
    address:joi.string(),
    profile_url:joi.string()
})