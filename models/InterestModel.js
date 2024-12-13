const mongoose = require('mongoose');


const {DateTime} = require('luxon')


const createdOn = DateTime.now().toLocaleString({weekday:"short",month:"short",day:"2-digit", year:"numeric", hour:"2-digit",minute:"2-digit"})

const interestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InvestmentPlan'
    },
    investment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invest'
    },
    amount: {
        type: Number,
        required: true
    },
    transactionType: {
        type: String,
        default: 'Interest'
    },
    Date:{
        type:String,
        default:createdOn
    }
});

const InterestModel = mongoose.model('Interest', interestSchema);

module.exports = InterestModel;
