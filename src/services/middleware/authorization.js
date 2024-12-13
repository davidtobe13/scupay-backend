// // const jwt = require('jsonwebtoken');
// // const userModel = require('../models/userModel');

// // const authorization = async (req, res, next) => {
// //     try {
// //         const auth = req.headers.authorization;

// //         if (!auth) {
// //             return res.status(404).json({
// //                 message: 'No authorization token found'
// //             });
// //         }

// //         const token = auth.split(' ')[1];

// //         if (!token) {
// //             return res.status(404).json({
// //                 message: `Authorization failed`
// //             });
// //         }

// //         const decodedToken = jwt.verify(token, process.env.secret);

// //         const user = await userModel.findById(decodedToken.userId);

// //         if (!user) {
// //             return res.status(404).json({
// //                 message: `Authorization failed: User not found`
// //             });
// //         }

// //         if(user.blacklist.includes(token)){
// //             return res.status(403).json({
// //                 message: 'Authorization failed: You are logged out. Please login to continue'
// //             })
// //         }

// //         req.user = decodedToken;

// //         next();
// //     } catch (err) {
// //         if (err instanceof jwt.JsonWebTokenError) {
// //             return res.status(401).json({
// //                 message: 'Authorization failed: Invalid token'
// //             });
// //         }
    
// //         res.status(500).json({
// //             message: err.message
// //         });
// //     }
// // }    

// // module.exports = authorization;


// const userModel = require("../models/userModel");
// const jwt = require("jsonwebtoken");
// require('dotenv').config();

// const authenticate = async (req, res, next) => {
//     try {
//         // Get the token and split it from the bearer
//         const token = req.headers.authorization.split(" ")[1];
//         if (!token) {
//             return res.status(404).json({
//                 error: "Authorization failed: token not found"
//             });
//         }
//         // Check the validity of the token
//         const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        
//         // Find user by ID in userModel
//         let user = await userModel.findById(decodedToken.userId);
//         if (!user) {
//             return res.status(404).json({
//                 error: "User not found"
//             });
//         }

//         // Check if the token is blacklisted
//         if (user.blacklist.includes(token)) {
//             return res.status(400).json({
//                 error: "Unable to perform this action: User is logged out"
//             });
//         }

//         // Store the user object in the request object
//         req.user = {
//             userId: user._id
//         };
        
//         next();
//     } catch (error) {
//         if (error instanceof jwt.JsonWebTokenError) {
//             return res.status(400).json({
//                 error: "Session Timeout"
//             });
//         }
//         res.status(500).json({
//             error: error.message
//         });
//     }
// };


// module.exports = authenticate ;




// const userModel = require("../models/userModel");
// const adminModel = require("../models/adminModel");
// const jwt = require("jsonwebtoken");
// require('dotenv').config();

// const authenticate = async (req, res, next) => {
//     try {
//         // Get the token and split it from the bearer
//         const token = req.headers.authorization.split(" ")[1];
//         if (!token) {
//             return res.status(404).json({
//                 error: "Authorization failed: token not found"
//             });
//         }
//         // Check the validity of the token
//         const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        
//         // Find user by ID in userModel
//         let user = await userModel.findById(decodedToken.userId);
//         if (!user) {
//             // If not found, find in adminModel
//             user = await adminModel.findById(decodedToken.userId);
//         }
        
//         if (!user) {
//             return res.status(404).json({
//                 error: "User is not found"
//             });
//         }

        
        
//         // Determine if the user is an admin based on the model they are retrieved from
//         const isAdmin = user.isAdmin || (user.admin && user.admin.isAdmin);

//         // Check if the token is blacklisted
//         if (user.blacklist.includes(token)) {
//             return res.status(400).json({
//                 error: "Unable to perform this action: User is logged out"
//             });
//         }

//         // Store the user object along with the isAdmin flag in the request object
//         req.user = {
//             userId: user._id,
//             isAdmin: isAdmin
//         };
        
//         next();
//     } catch (error) {
//         if (error instanceof jwt.JsonWebTokenError) {
//             return res.status(400).json({
//                 error: "Session Timeout"
//             });
//         }
//         res.status(500).json({
//             error: error.message
//         });
//     }
// };

// const authenticateAdmin = async (req, res, next) => {
//     try {
//         await authenticate(req, res, () => {
//             if (req.user.isAdmin) {
//                 next();
//             } else {
//                 return res.status(403).json({
//                     error: "Unauthorized access: Admin privileges required"
//                 });
//             }
//         });
//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         });
//     }
// };

// module.exports = { authenticate, authenticateAdmin };



const userModel = require("../models/userModel");
const adminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const authenticate = async (req, res, next) => {
    try {
        // Get the token and split it from the bearer
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(404).json({
                error: "Authorization failed: token not found"
            });
        }
        // Check the validity of the token
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        
        // Find user by ID in userModel
        let user = await userModel.findById(decodedToken.userId);
        if (!user) {
            // If not found, find in adminModel
            user = await adminModel.findById(decodedToken.userId);
        }
        
        if (!user) {
            return res.status(404).json({
                error: "User is not found"
            });
        }

        // Determine if the user is an admin based on the model they are retrieved from
        const isAdmin = user.isAdmin || (user.admin && user.admin.isAdmin);

        // Check if the token is blacklisted
        if (user.blacklist.includes(token)) {
            return res.status(400).json({
                error: "Unable to perform this action: User is logged out"
            });
        }

        // Store the user object along with the isAdmin flag in the request object
        req.user = {
            userId: user._id,
            isAdmin: isAdmin
        };
        
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({
                error: "Session Timeout"
            });
        }
        res.status(500).json({
            error: error.message
        });
    }
};

const authenticateAdmin = async (req, res, next) => {
    try {
        await authenticate(req, res, () => {
            if (req.user.isAdmin) {
                next();
            } else {
                return res.status(403).json({
                    error: "Unauthorized access: Admin privileges required"
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = { authenticate, authenticateAdmin };
