const { createCatalogue, updateCatalogue, deleteCatalogue, getCatalogue } = require("../db/query")
const { generalError, created, success } = require("../helpers/statusCodes")
const { catalogueUploadValidator } = require("../helpers/validator")


exports.uploadCatalogue = async(req, res, next) =>{
    const valid_ = catalogueUploadValidator.validate(req.body)
    // console.log(valid_)
    if (valid_?.error){
        return generalError(res, valid_?.error?.message)
    }

    const {name, price, description} = req?.body
    let catalogue_data = {
        businessId:req?.user?.bus?.id,
        name,
        price,
        description
    }
    // we are going to shift it to after created because  of cloudinary upload of images
    await createCatalogue(catalogue_data)

    return created(res, "Product added to catalogue")
    // {
    //     name,
    //     price,
    //     description,
    //     images // multiple
    // }
}

exports.editCatalogue = async (req, res, next) =>{
    
}

exports.fetchCatalogueList = async (req, res, next) =>{
    const bus_id = req?.user?.bus?.id
    const {limit, page} = req?.query

    usable_limit = limit?limit : 10
    usable_page = page? page: 0
    offset = Number(usable_limit) * Number(usable_page)

    const q = await getCatalogue(bus_id, usable_limit, offset)

    return success(res, q, "")
}

// exports