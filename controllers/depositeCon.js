
const userModel = require('../models/userModel')
const depositModel = require('../models/depositModel')
const cloudinary = require('../utils/cloudinary')


// const currencyapi = require('@everapi/currencyapi-js');
require("dotenv").config()
const axios = require('axios');
const adminModel = require('../models/adminModel');

// Deposit function







// exports.deposit = async (req, res) => {
//     try {
//         // Get the depositor's id
//         const { userId } = req.user;

//         // Find the depositor
//         const depositor = await userModel.findById(userId);

//         // Get the details for transaction
//         const { amount, coin } = req.body;
//         const newAmount = Number(amount);

//         // Check if the amount is within the allowed range
//         if (newAmount <= 0 || newAmount > 9999999 || newAmount === NaN) {
//             return res.status(400).json({
//                 message: 'You can only deposit between 0 and 9,999,999'
//             });
//         }

//         if (coin !== "BTC" && coin !== "ETH") {
//             return res.status(404).json({
//                 message: `Coin not available`
//             });
//         }


//         let image
//         const file = req.file.path;

//         const result = await cloudinary.uploader.upload(file);

//         image = result.secure_url;

//         const Depo = await depositModel.find()

//         // Save the deposit details
//         const deposit = new depositModel({
//             user: depositor._id,
//             amount: `${newAmount}`,
//             coin,
//             status: 'pending',
//             transactionType: Depo.transactionType,
//             image

//         });

        
//         // Save the transfer id to the user
//         depositor.Transactions.deposits.push(deposit._id);
//         await depositor.save();
//         await deposit.save();



//         if(deposit.status === 'pending'){
//             return res.status(200).json({
//                 message: `Deposit made and pending`,
//                 data: deposit
//             })
//         }
     
//     } catch (err) {
//         res.status(500).json({
//             message: err.message
//         });
//     }
// };


// exports.deposit = async (req, res) => {
//     try {
//         // Get the depositor's id
//         const { userId } = req.user;

//         // Find the depositor
//         const depositor = await userModel.findById(userId);

//         // Get the details for transaction
//         const { amount, coin } = req.body;
//         const newAmount = Number(amount);

//         // Check if the amount is within the allowed range
//         if (isNaN(newAmount) || newAmount <= 0 || newAmount > 9999999) {
//             return res.status(400).json({
//                 message: 'You can only deposit between 0 and 9,999,999'
//             });
//         }

//         if (coin !== "BTC" && coin !== "ETH") {
//             return res.status(404).json({
//                 message: `Coin not available`
//             });
//         }
//         if (!req.file) {
//             return res.status(400).json({
//                 message: 'Image file is required'
//             });
//         }

//         let image;
//         const file = req.file.path;

//         const result = await cloudinary.uploader.upload(file);
//         image = result.secure_url;

//         const Depo = await depositModel.findOne(); // Assuming only one document

//         // Save the deposit details
//         const deposit = new depositModel({
//             user: depositor._id,
//             amount: `${newAmount}`,
//             coin,
//             status: 'pending',
//             transactionType: Depo ? Depo.transactionType : 'default', 
//             image
//         });

//         // Save the transfer id to the user
//         depositor.Transactions.deposits.push(deposit._id);
//         await depositor.save();
//         await deposit.save();

//         if (deposit.status === 'pending') {
//             return res.status(200).json({
//                 message: `Deposit made and pending`,
//                 data: deposit
//             });
//         }

//     } catch (err) {
//         res.status(500).json({
//             message: err.message
//         });
//     }
// };







// exports.deposit = async (req, res) => {
//     try {
//         // Get the depositor's id
//         const { userId } = req.user;

//         // Find the depositor
//         const depositor = await userModel.findById(userId);

//         // Get the details for transaction
//         const { amount, coin } = req.body;
//         const newAmount = Number(amount);

//         // Check if the amount is within the allowed range
//         if (isNaN(newAmount) || newAmount <= 0 || newAmount > 9999999) {
//             return res.status(400).json({
//                 message: 'You can only deposit between 0 and 9,999,999'
//             });
//         }

//         if (coin !== "BTC" && coin !== "ETH") {
//             return res.status(400).json({
//                 message: `Coin not available`
//             });
//         }

//         // Check if file was uploaded
//         if (!req.file) {
//             return res.status(400).json({
//                 message: 'Image file is required'
//             });
//         }

//         let image;
//         const file = req.file.path;

//         // Upload file to Cloudinary
//         const result = await cloudinary.uploader.upload(file);
//         image = result.secure_url;

//         // Clean up: remove file from tmp directory after uploading to Cloudinary
//         fs.unlink(file, (err) => {
//             if (err) console.error("Error deleting temp file:", err);
//         });

//         const Depo = await depositModel.findOne(); // Assuming only one document

//         // Save the deposit details
//         const deposit = new depositModel({
//             user: depositor._id,
//             amount: `${newAmount}`,
//             coin,
//             status: 'pending',
//             transactionType: Depo ? Depo.transactionType : 'default', 
//             image
//         });

//         // Save the transfer id to the user
//         depositor.Transactions.deposits.push(deposit._id);
//         await depositor.save();
//         await deposit.save();

//         if (deposit.status === 'pending') {
//             return res.status(200).json({
//                 message: `Deposit made and pending`,
//                 data: deposit
//             });
//         }

//     } catch (err) {
//         res.status(500).json({
//             message: err.message
//         });
//     }
// };










const fs = require('fs');
const path = require('path');

exports.deposit = async (req, res) => {
    try {
        // Get the depositor's id
        const { userId } = req.user;

        // Find the depositor
        const depositor = await userModel.findById(userId);

        // Get the details for transaction
        const { amount, coin } = req.body;
        const newAmount = Number(amount);

        // Check if the amount is within the allowed range
        if (isNaN(newAmount) || newAmount <= 0 || newAmount > 9999999) {
            return res.status(400).json({
                message: 'You can only deposit between 0 and 9,999,999'
            });
        }

        if (coin !== "BTC" && coin !== "ETH") {
            return res.status(400).json({
                message: `Coin not available`
            });
        }

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                message: 'Image file is required'
            });
        }

        // console.log("File details:", req.file);  // Debug log

        let image;
        const file = req.file.path;

        // Check if file exists
        if (!fs.existsSync(file)) {
            console.error(`File not found: ${file}`);
            return res.status(400).json({
                message: 'Uploaded file not found'
            });
        }

        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(file);
        image = result.secure_url;

        // Clean up: remove file from tmp directory after uploading to Cloudinary
        fs.unlink(file, (err) => {
            if (err) console.error("Error deleting temp file:", err);
        });

        const Depo = await depositModel.findOne(); // Assuming only one document

        // Save the deposit details
        const deposit = new depositModel({
            user: depositor._id,
            amount: `${newAmount}`,
            coin,
            status: 'pending',
            transactionType: Depo ? Depo.transactionType : 'default', 
            image
        });

        // Save the transfer id to the user
        depositor.Transactions.deposits.push(deposit._id);
        await depositor.save();
        await deposit.save();

        if (deposit.status === 'pending') {
            return res.status(200).json({
                message: `Deposit made and pending`,
                data: deposit
            });
        }

    } catch (err) {
        console.error("Deposit error:", err);  // Debug log
        res.status(500).json({
            message: err.message
        });
    }
};







exports.getAllDeposits = async (req, res) => {
    try {

        const {userId} = req.user;
        const user = await adminModel.findById(userId);

        if(!user){
            return res.status(404).json({
                message: `Admin not found`
            })
        }
        // Find all deposit records and populate the user field to get user information
        const deposits = await depositModel.find().populate('user');

        if (!deposits || deposits.length === 0) {
            return res.status(200).json({
                message: 'No deposit records found'
            });
        }

        // Return the retrieved deposit records with user information
        res.status(200).json({ data: deposits });
    } catch (error) {
        // Handle errors
        console.error('Error fetching deposits:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};