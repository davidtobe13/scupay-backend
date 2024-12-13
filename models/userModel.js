const mongoose = require('mongoose');


const currentDate = new Date();
const createdOn = currentDate.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric'
})


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    userName: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
    },
    acctBalance:{
        type: Number,
        default: 0
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    Transactions: {
        deposits: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'deposit'
        }],
        withdrawals: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'withdraw'
        }],
        creditOrDebit: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Invest'
        }],
        interests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Interest'
        }],
    },
    createdAt:{
        type:String,
        default:createdOn
    },
    blacklist : {
        type: Array,
        default: [],
    }
})

const userModel  = mongoose.model('user', userSchema)

module.exports = userModel