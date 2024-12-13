const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    email: {
        type: String
    },
    fullName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    studentId: {
        type: String
    },
    password: {
        type: String,
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    school:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "school"
    },
    class:{
        type: String
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

const studentModel  = mongoose.model('student', studentSchema)

module.exports = studentModel


