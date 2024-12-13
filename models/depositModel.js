const mongoose = require("mongoose")

const currentDate = new Date();
const createdOn = currentDate.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric'
})

const depositSchema = new mongoose.Schema({
    transactionType:{
        type:String,
        default:"Deposit"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    amount:{
        type:Number
    },
    coin:{
        type:String
    },
    image:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum: ['pending', 'confirmed', 'declined'],
        default: 'pending'
    },
    depositDate:{
        type:String,
        default:createdOn
    }
})

const depositModel = mongoose.model("deposit",depositSchema)

module.exports = depositModel