const schoolModel = require("./model");
const bcrypt = require("bcryptjs");
const {sendEmail} = require("../services/email-service/email");

exports.schoolSignup = async (req, res) => {
    try {
        const { schoolName, email, phoneNumber, password, confirmPassword} = req.body;

        const schoolExists = await schoolModel.findOne({ email: email.toLowerCase() });
        if (schoolExists) {
            return res.status(400).json({
                message: `school with email ${schoolExists.email} already exists`
            });
        }
        const schoolNameExist = await schoolModel.findOne({ schoolName: schoolName });
        if (schoolNameExist) {
            return res.status(400).json({
                message: `school with schoolName ${schoolNameExist.schoolName} already exists`
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Passwords do not match'
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const school = await schoolModel.create({
            schoolName,
            phoneNumber,
            email: email.toLowerCase(),
            password: hash,
        });

        const name = `${school.schoolName.toUpperCase()}`;
        sendEmail({
            email: school.email,
            subject: `WELCOME, ${name}`,
            html: `

            <!DOCTYPE html>
            <html lang="en">
            <body>
           <div>
           <h4>Welcome to SCUPAY</h4>
           <br/>
           <p>Dear Sir/Ma,</p>
           <p>We are excited to have you on board</p>
           <br/>
            <img src="https://i.ibb.co/bs2Gvt4/xlogo.png" alt="" style="width: 150px;       max-width: 300px; height: auto; margin: auto; display: block;">
                <h4>Thank you for joining the waitlist on SCUPAY.</h4>
                <br/>
                <p>Best regards,</p>
                <p>Scupay</p>
                <br/>
                <center>
                <p>If you did not sign up for this service, please ignore this email</p>
                <p> &copy; 2024 Scupay. All rights reserved.</p>
                </center>
                    </div>
            </body>
            </html>
          
            `
        }
    );

        const date = new Date().toLocaleString('en-NG', {timeZone: 'Africa/Lagos', ...{ weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }});
        const time = new Date().toLocaleString('en-NG', {timeZone: 'Africa/Lagos', ...{hour: '2-digit', minute: '2-digit', hourCycle: 'h24' }});
        const schoolsName = `${school.schoolName.toUpperCase()}`;

        // Send email to admin
        sendEmail({
            email: "davidtobe1999@gmail.com",
            subject: `New school Sign-up Notification`,
            html: `<p>Dear Admin,<br>We are pleased to inform you that a new school has recently signed up on your web app. <br>Here are the school's details:</p><p>Name: ${schoolsName} <br>Email: ${school.email} <br> Date: ${date} <br> Time: ${time} </p><p>Best Regards, <br> Your Developer</p>`
        }
        , (error, message) => {
            if (error) {
                return res.status(500).json({
                    error: 'Error sending email: ' + error.message
                });
            } else {
                return res.status(200).json({
                    message: message
                });
            }
        }
    );

        res.status(201).json({
            message: `Welcome, ${school.schoolName}. You have created an account successfully`,
            data: school
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
