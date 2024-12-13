const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    email: {
        type: String
    },
    schoolName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    password: {
        type: String,
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isSchool:{
        type: Boolean,
        default: true
    },
    students:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "student"
    },
    classes:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "class"
    },
    fees:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "fee"
    },
    image:{
        type:String,
    },
    admins:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "admin"
    }
})

const schoolModel  = mongoose.model('school', schoolSchema)

module.exports = schoolModel


