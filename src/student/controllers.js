const schoolModel = require("../school/model");
const studentModel = require("./model");
const bcrypt = require("bcryptjs");
const {sendEmail} = require("../services/email-service/email");

exports.studentSignup = async (req, res) => {
    try {

        const id = req.params.id
        const { fullName, email, phoneNumber, password, confirmPassword} = req.body;

        const studentExists = await studentModel.findOne({ email: email.toLowerCase() });
        if (studentExists) {
            return res.status(400).json({
                message: `student with email ${studentExists.email} already exists`
            });
        }
        const school = await schoolModel.findById(id);
        if (!school) {
            return res.status(400).json({
                message: `School  not found`
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Passwords do not match'
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

            const initials = school.schoolName
                .split(' ')
                .map(word => word[0].toUpperCase())
                .join('');
            
            // Generate three random digits
            const randomNumbers = Math.floor(1000 + Math.random() * 9999); 
            
            // Concatenate initials and random numbers
            const newStudentId = initials + randomNumbers;
        

        const student = await studentModel.create({
            fullName,
            phoneNumber,
            studentId: newStudentId,
            email: email.toLowerCase(),
            password: hash,
        });

        console.log(school.email);
        

        const name = `${student.fullName.toUpperCase()}`;
        sendEmail({
            from: school.email,
            email: student.email,
            subject: `WELCOME, ${name}`,
            html: `

            <!DOCTYPE html>
            <html lang="en">
            <body>
           <div>
           <h4>Welcome to Scupay</h4>
           <br/>
           <p>Dear ${name},</p>
           <p>We are excited to have you on board</p>
           <br/>
            <img src="https://i.ibb.co/bs2Gvt4/xlogo.png" alt="" style="width: 150px;       max-width: 300px; height: auto; margin: auto; display: block;">
                <h4>You have successfully registered your student account on SCUPAY and your Student Id is: ${student.studentId}.</h4>
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
        const studentsName = `${student.fullName.toUpperCase()}`;

        // Send email to admin
        sendEmail({
            email: school.email,
            from: "davidtobe1999@gmail.com",
            subject: `New student Sign-up Notification`,
            html: `<p>Dear Admin,<br>We are pleased to inform you that a new student has recently signed up on your web app. <br>Here are the student's details:</p><p>Name: ${studentsName} <br>Email: ${student.email} <br>Student Id: ${student.studentId} <br> Date: ${date} <br> Time: ${time} </p><p>Best Regards, <br> Your Developer</p>`
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
            message: `Welcome, ${student.fullName}. You have created an account successfully`,
            data: student
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
