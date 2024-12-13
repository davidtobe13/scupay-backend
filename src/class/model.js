const { DateTime } = require('luxon');
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className: {
        type: String
    },
    school:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "school"
    },
    students:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "student"
    }
})

const classModel  = mongoose.model('class', classSchema)

module.exports = classModel