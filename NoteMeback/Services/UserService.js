let UserModel = require('../Models/UserModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const joi = require('joi')
const OtpGenerator = require('otp-generator')
const nodemailer = require('nodemailer')
const { client } = require('../Redis')
const axios = require('axios');
const MyDataModel = require('../Models/MyDataModel');
require('dotenv').config()
const key = process.env.SECRETKEY;


const signupSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
    name: joi.string().required()
})

async function register(req,res){
    try {
        //JOI validation
        const { value, error } = signupSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ error: "Invalid format" });
        }

        const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.EMAIL_VALID_API}&email=${value.email}`)
        // Accessing response data
        const responseData = response.data;

        if (responseData.deliverability === "UNDELIVERABLE") {
            return res.status(404).json({ status: false, message: "No such email Exists!" });
        }
        //Check Existing User
        const ExistingUser = await UserModel.findOne({ email: value.email });
        if (ExistingUser) return res.status(409).json({status:false, message: "Email already exists!" })

        //hashing the password
        const hashpassword = await bcrypt.hash(value.password, 10)

        //Create new User
        const newUser = new UserModel({name:value.name, email: value.email, password: hashpassword });
        await newUser.save();
        return res.json({ status: true, message: "Account Created successfully", email : newUser.email})
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: error })
    }
}

async function sendotp(req, res) {
    try {
        const { name, email, password } = req.body;

        //Check Existing User
        const existingUser = await UserModel.findOne({ email: email })
        if (existingUser) {
            //Generate OTP
            const otp = await generateotp();

            //Storing otp in redis
            await client.set(`${email}`, `${otp}`, 'EX', 60)

            //sending mail to user
            const isMailsent = sendMail(email, otp)
            // if (isMailsent) {
                return res.status(200).json({status:true, message: "OTP sent successfully!" })
            // }
            // else {
            //     return res.status(400).json({ message: "Error in sending OTP" })
            // }
        }
        else {
            if (password) {
                console.log(password)
                console.log("inside pass")
                //hashing the password
                const hashpassword = await bcrypt.hash(password, 10)

                //Create new User
                const newUser = new UserModel({ name:name, email: email, password: hashpassword });
                await newUser.save();

                //Generate OTP
                const otp = await generateotp();

                //Storing otp in redis
                await client.set(`${email}`, `${otp}`, 'EX', 60)

                //sending mail to user
                const isMailsent = sendMail(email, otp)
                // if (isMailsent) {
                    return res.status(200).json({ message: "OTP sent successfully!" })
                // }
                // else {
                //     return res.status(400).json({ message: "Error in sending OTP" })
                // }

            }
            return res.status(404).json({status:false, message: "Account doesn't exist! Enter name and password to create a new account" })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ Error: error })
    }
}

async function verifyotp(req, res) {
    const { email, otp } = req.body;
    try {
        // Get otp from Redis
        const value = await client.get(`${email}`);
        if (!value) {
            return res.json({ status:false, message: "OTP expired!" });
        }

        //check if otp is valid
        if (value === otp) {
            const user = await UserModel.findOne({email:email})

            // Create auth token
            const authtoken = jwt.sign({ email: email, userid: user._id }, key);

            //create a datamodel with default values
            const data = new MyDataModel({Owner:user._id,email:email})
            await data.save()
            const updateuser = await UserModel.findOneAndUpdate({email:email},{mydata:data._id},{new:true})
            return res.status(200).json({status:true, message: "Login successful!", authtoken: authtoken});
        } else {
            return res.status(400).json({status:false, message: "Invalid OTP" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

async function checkvalidemail(req, res) {
    const { email } = req.body;
    try {
        const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.EMAIL_VALID_API}&email=${email}`)
        
        // Accessing response data
        const responseData = response.data;
        
        if (responseData.is_valid_format.value === false) {
            return res.json({ status: false, message: "Invalid email format" });
        }
        if (responseData.deliverability === "UNDELIVERABLE") {
            return res.json({ status: false, message: "No such email Exists!" });
        }
        return res.json({ status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}


async function generateotp() {
    const otp = OtpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    return otp
}

async function sendMail(email, otp) {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.ACC_PASS
            }
        })

        let info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: `${email}`,
            subject: "OTP Verification",
            html: `
                <h2>Your One Time Password from NoteMe (OTP)</h2>
                <p><b>${otp}</b></p>
                <p>Don't share this OTP with anyone. 
                Our customer service team will never ask you for your password, OTP, Credit card,
                or banking info.</p>
            `
        })

        // console.log(info.messageId);
        return true
    }
    catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {register,sendotp, verifyotp, checkvalidemail};