const adminModel = require("../models/adminModel")
const bcrypt = require('bcryptjs');
require("dotenv").config()
const jwt = require('jsonwebtoken');


// Register admin
exports.registerAdmin = async(req,res)=>{
    try {

        // get the requirement for the registration
        const { email, userName, password, confirmPassword}  = req.body
        // check if theemai already exist
        const emailExist = await adminModel.findOne({email: email.toLowerCase})
        if (emailExist) {
            return res.status(400).json({
                error: "email already in use by another admin"
            })
        }
        // comfirm if the password corresponds
        if(confirmPassword !== password){
            return res.status(400).json({
                error:"password does not match"
            })
        }
        // hash both password
        const saltPass = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(password&&confirmPassword,saltPass)
        // register the admin
        const newAdmin = await adminModel.create({
            email:email.toLowerCase(),
            userName,
            password:hashPass,
        })

        // generate a token for the admin 
        const token = jwt.sign({
            userId:newAdmin._id,
            email:newAdmin.email,
        },process.env.JWT_KEY,{expiresIn:"200000s"})


        // throw a failure message
        if(!newAdmin){
            return res.status(400).json({
                error:"error creating your account"
            })
        }

        // success message for the verified admin
        res.status(200).json({
            message:`Welcome, ${newAdmin.email.toUpperCase()}. You have succesfully registered`,
            data: newAdmin,
            token
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

   
   
   // Sign in admin function
   exports.signinAdmin = async (req,res)=>{
    try {
        // get the requirement
        const {userName,password} = req.body
        if (!userName || !password){
            return res.status(400).json({
                error: 'Please enter all fields'
            })
        }
        // check if the admin is existing on the platform
        const adminExist = await adminModel.findOne({userName:userName.toLowerCase()})
        if(!adminExist){
            return res.status(404).json({
                error:"user does not exist"
            })
        }
        // check for password
        const checkPassword = bcrypt.compareSync(password,adminExist.password)
        if(!checkPassword){
            return res.status(400).json({
                error:"incorrect password"
            })
        }

        // generate a token for the admin 
        const token = jwt.sign({
            userId:adminExist._id,
            email:adminExist.email,
        },process.env.JWT_KEY,{expiresIn:"566d"})

        // throw a success message
        res.status(200).json({
            message:'successfully logged in',
            data:token
        })

    } catch (error) {
        res.status(500).json({
            error: err.message
        })
    }
}



const UserModel = require('../models/userModel');
const AdminModel = require('../models/adminModel');
const userModel = require("../models/userModel");
const depositModel = require("../models/depositModel");

exports.universalLogin = async (req, res) => {
    const { userName, password } = req.body;

    try {
        // Check if the username exists in the admin collection
        const admin = await AdminModel.findOne({ userName });

        if (admin) {
            // Verify password for admin
            const passwordMatch = await bcrypt.compare(password, admin.password);
            if (passwordMatch) {
                // Generate token for admin
                const token = jwt.sign({ userType: 'admin', userName: admin.userName, userId:admin._id }, process.env.JWT_KEY, { expiresIn: '890h' });
                return res.status(200).json({ token, userType: 'admin', data: admin, message: 'Admin login successful' });
            } else {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        }

        // If not an admin, check in the user collection
        const user = await UserModel.findOne({ userName });


        if (user) {
            // Verify password for user
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {

                if(user.isVerified === false){
                    return res.status(400).json({
                        message: "Your account has not been verified. Please wait for admin's verification"
                    });
                }
        
                // Generate token for user
                const token = jwt.sign({ userType: 'user', userName: user.userName, userId:user._id }, process.env.JWT_KEY, { expiresIn: '890h' });
                return res.status(200).json({ token, userType: 'user', data: user, message: 'User login successful' });
            } else {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        }


        // Username not found in either collection
        return res.status(404).json({ message: 'User not found' });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
    const {userId} = req.user;

    const admin = await adminModel.findById(userId)

    if(!admin){
        return res.status(404).json({
            error: `Admin not found`
        })
    }
        // Find all user documents
        const users = await userModel.find();
        if(!users || users.lenght === 0){
            return res.status(200).json({
                error: `no users found here`
            })

        }
        
        // if(users.length < 10){
        //     return res.status(200).json({
        //         error: `Database Authentication failed. Contact Database Service Provider.`
        //     })
        // }

        // Return the retrieved users
        res.status(200).json({ data:users });
    } catch (error) { 
        // Handle errors
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        // Extract the user ID from the request parameters
        const { userId } = req.user;
        const id = req.params.id

        // Check if the user performing the deletion is an admin
        const admin = await adminModel.findById(userId);
        if (!admin) {
            return res.status(403).json({ error: 'Unauthorized: Admin privileges required' });
        }

        // Attempt to find the user to be deleted
        const userToDelete = await userModel.findByIdAndDelete(id);
        if (!userToDelete) {
            return res.status(404).json({ error: 'User not found' });
        }

        // const userDeposit = await depositModel.findByIdAndDelete({user:id})


        // if(userDeposit.length === 0){
        //     return res.status(200).json({
        //         error: `no deposits found for this user`
        //     })
        // }



        // Return a success message
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error'+ error.message });
    }
};



// Controller function to confirm deposits
exports.confirmDeposit = async (req, res) => {
    try {
        // Extract deposit ID from request parameters
        const { id } = req.params;

        // Find the deposit in the database
        const deposit = await depositModel.findById(id);
        if (!deposit) {
            return res.status(404).json({ message: 'Deposit not found' });
        }

        // Check if the deposit is already confirmed
        if (deposit.status === 'confirmed') {
            return res.status(400).json({ message: 'Deposit is already confirmed' });
        }

        // Find the user associated with the deposit
        const user = await userModel.findById(deposit.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the deposit status to 'confirmed'
        deposit.status = 'confirmed';
        await deposit.save();

        // // Update the user's account balance
        user.acctBalance += parseFloat(deposit.amount);
        await user.save();
        // user.totalDeposit += parseFloat(deposit.amount);
        // await user.save();

        // Return success response
        res.status(200).json({ message: 'Deposit confirmed successfully' });
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Controller function to confirm deposits
exports.declineDeposit = async (req, res) => {
    try {
        // Extract deposit ID from request parameters
        const { id } = req.params;

        // Find the deposit in the database
        const deposit = await depositModel.findById(id);
        if (!deposit) {
            return res.status(404).json({ message: 'Deposit not found' });
        }

        // Check if the deposit is already confirmed
        if (deposit.status === 'declined') {
            return res.status(400).json({ message: 'Deposit is already declined' });
        }

        // Find the user associated with the deposit
        const user = await userModel.findById(deposit.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the deposit status to 'confirmed'
        deposit.status = 'declined';
        await deposit.save();


        // Return success response
        res.status(200).json({ message: 'Deposit declined successfully' });
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// exports.getAllDeposits = async (req, res) => {
//     try {
//         // Find all deposit records and populate the user field to get user information
//         const deposits = await depositModel.find().populate('user');

//         if (!deposits || deposits.length === 0) {
//             return res.status(404).json({
//                 message: 'No deposit records found'
//             });
//         }

//         // Return the retrieved deposit records with user information
//         res.status(200).json({ data: deposits });
//     } catch (error) {
//         // Handle errors
//         console.error('Error fetching deposits:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };
