import Users from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

const Register = async (req, res) => {
    try {
        const { firstname, lastname, email, mobilenumber, gender, age, password } = req.body
        // check if email is already exists
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" })
        }
        //hashed the password

        const hashedPassword = await bcrypt.hash(password, 10)

        //generate verification token 

        const verificationToken = crypto.randomBytes(32).toString("hex")

        //create a new user
        await Users.create({
            firstname,
            lastname,
            email,
            mobilenumber,
            gender,
            age,
            password: hashedPassword,
            emailVerificationToken: verificationToken,
            emailVerified: false
        })

        //
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sukhpreetvirdi2000@gmail.com",
                pass: "necb tyxb fynz hfsu",
            }
        })

        const mailOptions = {
            to: email,
            from: 'sukhpreetvirdi2000@gmail.com',
            subject: 'Account Verification',
            text: `Hello ${firstname},\n\n
                Please verify your email by clicking the link below:\n\n
                http://localhost:3000/verify-email/${verificationToken}\n\n
                If you did not request this, please ignore this email.\n`,
        };

       transporter.sendMail(mailOptions, (error) => {
            if (error) {
                return res.status(500).json({ message: "Error sending verification email" });
            }
            return res.status(200).json({ message: "Verification email sent" });
        });

        return res.status(201).json({ message: "User registered successfully. Verification email sent." });
    }
    catch (err) {
        return res.status(500).json({ err: "Internal Server Error" })
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        //find user from db

        const user = await Users.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "Invalid credentials" })
        }

        //compare passwords

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(404).json({ message: "Invalid credentials" })
        }

        // Generate JWT token

        const token = jwt.sign({ email: user.email }, 'secret')

        // save token in user document
        user.token = token
        await user.save()

        return res.status(200).json({ token: token, message: "Login successFully" })
    }
    catch (err) {
        return res.status(500).json({ err: "Internal Server Error" })
    }
}

const Userdata = async (req, res) => {
    try {
        const { email } = req.user

        const user = await Users.findOne({ email })

        if (!user) {
            return res.status(404).json({ email: "User Not Found" })
        }
        const data = { firstname: user.firstname, lastname: user.lastname, email: user.email, mobilenumber: user.mobilenumber, gender: user.gender, age: user.age }
        return res.status(200).json({ data: data })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export { Register, Login, Userdata }
