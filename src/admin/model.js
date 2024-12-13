const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String
    },
    fullName: {
        type: String
    },
    password: {
        type: String,
    },
    isVerified:{
        type: Boolean,
        default: true
    },
    students:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "student"
    },
    image:{
        type:String,
    },
    school:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "school"
    }
})

const adminModel  = mongoose.model('admin', adminSchema)

module.exports = adminModel


