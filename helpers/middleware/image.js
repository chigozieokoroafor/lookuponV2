const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { generalError } = require("../statusCodes");
const cloudinary = require("cloudinary").v2

const maxSize = 2 * 1024 * 1024; // 2MB
const allowedTypes = ['image/jpeg', 'image/png'];

function uploadFilter(req, file, cb) {
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error(`Invalid file type: Only JPEG and PNG files are allowed. ${file.originalname.split(".")[1]}`));
    }
    cb(null, true);
}

const ProfileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, "../../temp/img/profile");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true }); // Create the directory recursively
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = `${req.user.uid}${fileExt}`;
        cb(null, fileName);
    }
});

const upload = multer({
    storage: ProfileStorage,
    limits: { fileSize: maxSize },
    fileFilter: uploadFilter
});

exports.profileuploadMiddleware = (req, res, next) => {
    const uploadFile = upload.single("file");

    uploadFile(req, res, (err) => {
        if (err) {
            const errMessage = err.message.split(". ");
            const filePath = path.join(__dirname, `../../temp/img/profile/${req.user.uid}.${errMessage[1].trim()}`);

            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (unlinkErr) => {
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

// test this out later
exports.CloudinaryUpload = class{
    static apiKey = process.env.CLOUDINARY_API_KEY
    static apiSecret = process.env.CLOUDINARY_SECRET_KEY
    static cloudname = process.env.CLOUDINARY_CLOUD_NAME

    static async upload(filePath){
        cloudinary.config({ 
            cloud_name: 'dgpnmwhra', 
            api_key: '795215954789167', 
            api_secret: 'av-ntQ3CyPFntVaIlcNZlOfmJtI'
          })
        
        const f = await cloudinary.uploader.upload(filePath)
        console.log("F:::::", f)

        return true

    }
}
// Custom file upload middleware
// const fs = require("fs");
// const multer = require("multer");

// const maxSize = 2 * 1024 * 1024; // 2MB
// const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

// function uploadFilter(req, file, cb){
//   if (!allowedTypes.includes(file.mimetype)){
//     cb(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'));
//   }else {
//     cb(null, true)
//   }
// }
// const upload = multer({dest:"tmp/docs/", limits:{fileSize:maxSize}, fileFilter:uploadFilter})


// const docuploadMiddleware = (req, res, next) => {
//   // Define the fields expected
//   const uploadFields = upload.fields([
//     { name: 'cac', maxCount: 1 },  // 'files' can contain up to 10 files
//     { name: 'license', maxCount: 1 },
//     { name: "others", maxCount:5} // 'documents' can contain up to 5 files
//   ]);
//   // Use multer upload instance
//   uploadFields(req, res, (err) => {
    
//     if (err) {
//       // fs.rmSync("tmp/docs/")
//       return res.status(400).json({ error: err.message });
//     }

//     // Retrieve uploaded files
//     const cac = req.files?.cac || [];
//     const license = req.files?.license || [];
//     const others  = req.files?.others || [];
//     const allFiles = [...cac, ...license, ...others];
    
//     // Attach files to the request object

//     req.body.docs = {"cac":cac[0] || {},
//                     "license":license[0] || {},
//                     "others":others[0] || [],
//                   };
//     req.doc_uploaded = allFiles.length >0
    
//     // Proceed to the next middleware or route handler
//     next();
//   });
// };

// module.exports = {
//     docuploadMiddleware
// }
