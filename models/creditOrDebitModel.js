const mongoose = require("mongoose")

const currentDate = new Date();
const createdOn = currentDate.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric'
})

const creditOrDebitSchema = new mongoose.Schema({
    transactionType:{
        type:String,
        default:"creditOrDebit"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    amount:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum: ['Credit', 'Debit']
    },
    Date:{
        type:String,
        default:createdOn
    }
})

const creditOrDebitModel = mongoose.model("creditOrDebit",creditOrDebitSchema)

module.exports = creditOrDebitModel