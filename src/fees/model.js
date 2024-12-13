const { DateTime } = require('luxon');
const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    feeType: {
        type: String
    },
    value: {
        type: Number
    },
    school:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "school"
    },
    class:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "class"
    },
    deadline:{
        type: DateTime
    },
    session:{
        type: String
    }
})

const feeModel  = mongoose.model('fee', feeSchema)

module.exports = feeModel


