// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, './uploads')
//     },

//     filename: (req, file, cb) =>{
//         cb(null, file.originalname)
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')){
//         cb(null, true)
//     }
//     else{
//         cb(new message('This file type is not supported; Accepts image only'), false)
//     }
// }

// const fileSize = {
//     limits: 1024 * 1024 * 10
// }

// const upload = multer({
//     storage,
//     fileFilter,
//     limits: fileSize
// })

// module.exports = upload


// const multer = require('multer');
// const path = require('path');

// const uploadsDir = './uploads';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadsDir)
//     },

//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//         cb(null, true)
//     } else {
//         cb(new Error('This file type is not supported; Accepts image only'), false)
//     }
// }

// const upload = multer({
//     storage,
//     fileFilter,
//     limits: {
//         fileSize: 1024 * 1024 * 10 // 10 MB
//     }
// })

// module.exports = upload;


// const multer = require('multer');
// const path = require('path');

// const tmpDir = path.join(__dirname, 'tmp');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, tmpDir)
//     },

//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//         cb(null, true)
//     } else {
//         cb(new Error('This file type is not supported; Accepts image only'), false)
//     }
// }

// const upload = multer({
//     storage,
//     fileFilter,
//     limits: {
//         fileSize: 1024 * 1024 * 10 // 10 MB
//     }
// })

// module.exports = upload;



const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the path for the tmp directory
const tmpDir = path.join(__dirname, 'tmp');

// Ensure the tmp directory exists
if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
    console.log('Temporary upload directory created:', tmpDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tmpDir)
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error('This file type is not supported; Accepts image only'), false)
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 10 // 10 MB
    }
})

module.exports = upload;