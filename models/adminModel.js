const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String
    },
    userName: {
        type: String
    },
    password: {
        type: String,
    },
    isVerified:{
        type: Boolean,
        default: true
    },
    isAdmin:{
        type: Boolean,
        default: true
    },
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user"
    },
    blacklist : {
        type: Array,
        default: [],
    }
})

const adminModel  = mongoose.model('admin', adminSchema)

module.exports = adminModel


