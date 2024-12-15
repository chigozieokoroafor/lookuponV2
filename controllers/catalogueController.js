const { createCatalogue, updateCatalogue, deleteCatalogue, getCatalogue } = require("../db/query")
const { generalError, created, success } = require("../helpers/statusCodes")
const { catalogueUploadValidator, catalogueUpdateValidator } = require("../helpers/validator")


exports.uploadCatalogue = async (req, res, next) => {
    const valid_ = catalogueUploadValidator.validate(req.body)
    // console.log(valid_)
    if (valid_?.error) {
        return generalError(res, valid_?.error?.message)
    }

    const { name, price, description } = req?.body
    let catalogue_data = {
        businessId: req?.user?.bus?.id,
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

exports.editCatalogue = async (req, res, next) => {
    const catalogue_id = req?.params?.cat_id
    if (!catalogue_id) {
        return generalError(res, "no selected catalogue")
    }
    const valid_ = catalogueUpdateValidator.validate(req?.body)
    if (valid_?.error) {
        return generalError(res, valid_?.error?.message)
    }

    let update = await updateCatalogue(catalogue_id, req?.user?.bus?.id, req?.body)
    if (!update[0]) {
        return generalError(res, "No update made")
    }

    return success(res, "", "Updated successfully")


}

exports.fetchCatalogueList = async (req, res, next) => {
    const bus_id = req?.user?.bus?.id
    const { limit, page } = req?.query

    usable_limit = limit ? limit : 10
    usable_page = page ? page : 0
    offset = Number(usable_limit) * Number(usable_page)

    const q = await getCatalogue(bus_id, usable_limit, offset)

    return success(res, q, "")
}

exports.deleteSpecificCaatalogue = async (req, res, next) => {
    const catalogue_id = req?.params?.cat_id
    if (!catalogue_id) {
        return generalError(res, "no selected catalogue")
    }

    let del = await deleteCatalogue(catalogue_id, req?.user?.bus?.id)
    if (!del) {
        return generalError(res, "unable to delete")
    }
    return success(res, "Catalogue deleted successfully")
}

// create a catalogue route for base users.