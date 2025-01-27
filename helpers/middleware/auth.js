const jwt = require("jsonwebtoken")
const { unAuthorized, generalError, expired, invalid, newError } = require("../statusCodes");
const { fetchBusinessProfileQuery } = require("../../db/query");
const { P } = require("../consts");

class Auth {
    secret = process.env.AUTH_SECRET

    constructor(secret) {
        if (secret) {
            this.secret = secret;
        }
    }

    auth = (req, res, next) => {


        if (!req?.headers?.authorization) {
            return unAuthorized(res, "Request unauthorized");
        }
        const authorization = req?.headers?.authorization;
        if (!authorization.startsWith("Bearer")) {
            return generalError(res, "Bearer authorization required");
        }
        const token = authorization.split("Bearer")[1].trim();

        // if (!req.session?.token){
        //     return unAuthorized(res, "Session expired");
        // }
        // const token = req?.session?.token

        let err;
        let err_status;

        try {
            const payload = jwt.verify(token, this.secret);

            req.user = payload.payload; // Store the payload in the request
            return next(); // Call next to proceed if token is valid
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                err = "Session Expired.";
                err_status = 403;
            } else if (error.name === "JsonWebTokenError") {
                err = "Invalid Token";
                err_status = 498;
            }
            // console.log(error)
        }
        req.err = {
            err: err,
            status: err_status
        };
        return next(); // Proceed to next middleware even if there's an error
    }
}

const baseAuth = (req, res, next) => {
    new Auth(process.env.AUTH_KEY).auth(req, res, () => {
        if (req?.err?.err) {
            return newError(res, req.err.err, req.err.status);
        } else if (!req?.user?.uid) {
            return unAuthorized(res, "Unauthorized");
        }
        next();
    });
}

const busAuth = (req, res, next) => {
    new Auth(process.env.AUTH_KEY).auth(req, res, async () => {
        if (req?.err?.err) {
            return newError(res, req.err.err, req.err.status);
        } else if (!req?.user?.uid) {
            return unAuthorized(res, "Unauthorized");
        }
        const bus = await fetchBusinessProfileQuery(req.user, [P.id,])
        if (!bus) {
            return generalError(res, "Route for business only")
        }
        req.user.bus = bus.toJSON()
        next();
    });
}

// const businessBaseAuth = (req, res, next)=>{
//     new Auth(process.env.AUTH_KEY).auth(req, res, () => {
//         if (req?.err?.err) {
//             return newError(res, req.err.err, req.err.status);
//         } else if (!req?.user?.uid) {
//             return unAuthorized(res, "Unauthorized");
//         }


//         next();
//     });
// }

// const student_auth = (req, res, next) => {
//     new Auth(process.env.STUDENT_SECRET).auth(req, res, () => {

//         if (req?.err?.err) {
//             return newError(res, req.err.err, req.err.status);
//         } else if (!req?.user?.matric_no) {
//             return unAuthorized(res, "Unauthorized");
//         }
//         next();
//     });
// }

module.exports = { baseAuth, busAuth }
