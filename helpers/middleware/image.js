const multer = require("multer")
const fs = require("fs");
const {generalError} = require("../statusCodes")

const maxSize = 2 * 1024 * 1024; // 2MB
const allowedTypes = ['image/jpeg', 'image/png'];

function uploadFilter(req, file,cb){
    
    // if (isUndefined(file)){
    //     cb(new Error(`No file passed. ${file.originalname.split(".")[1]}`));
    // }
    if (!allowedTypes.includes(file.mimetype)){
        
        cb(new Error(`Invalid file type: Only JPEG and PNG files are allowed.  ${file.originalname.split(".")[1]}`));
    }
    cb(null, true)
    
}

const ProfileStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "temp/img/profile")
    },
    filename: (req, file, cb)=>{
        
        const file_name = `${req.user.uid}.${file.originalname.split(".")[1]}`
        cb(null, file_name)
    }
})



// const upload = multer({dest:"temp/img/",limits:{fileSize:maxSize}, fileFilter:uploadFilter})
const upload = multer({storage:ProfileStorage, limits:{fileSize:maxSize}, fileFilter:uploadFilter})

// exports.upload = upload
exports.profileuploadMiddleware = (req, res, next) => {
    const uploadFile = upload.single("file");

    uploadFile(req, res, (err) => {
        if (err) {
            const errMessage = err.message.split(". ")     
            console.log(errMessage)      
            const filePath = `temp/img/profile/${req.user.uid}.${errMessage[1].trim()}` 
            console.log(filePath)
            if (fs.existsSync(filePath)) {
                console.log("exists")
                fs.unlinkSync(filePath, (unlinkErr) => {
                    
                    if (unlinkErr) {
                        console.log("Error deleting file:", unlinkErr.message);
                    }
                });
            }

            return generalError(res, errMessage[0]);
        }

        if (req.file) {
            req.body.user_file = req.file; // Attach the file data to req.body
        }

        next(); // Proceed to the next middleware or route handler
    });
};