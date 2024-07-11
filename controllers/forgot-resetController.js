import Users from "../models/userModel.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";;
import nodemailer from "nodemailer";

const ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body

        const user = await Users.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetExpires = Date.now() + 120000

        user.resetPasswordToken = resetToken
        user.resetPasswordExpires = resetExpires
        await user.save()


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "sukhpreetvirdi2000@gmail.com",
                pass: "necb tyxb fynz hfsu",
            }
        });

        const resetLink = `http://localhost:4000/reset-password/${resetToken}`;

        const mailOptions = {
            from: 'sukhpreetvirdi2000@gmail.com',
            to: user.email,
            subject: 'Password Reset Request',
            text: `Hi ${user.firstname},\n\n`
                + 'You are receiving this email because you (or someone else) have requested to reset the password for your account.\n\n'
                + `Please click on the following link, or paste it into your browser to complete the process:\n\n`
                + `${resetLink}\n\n`
                + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                return res.status(500).json({ message: "Error sending email" });
            }
            return res.status(200).json({ message: "Password reset link sent to your email" });
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const ResetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { password } = req.body

        if (!password) {
            return res.status(500).json({ message: "password is required" })
        }

        const user = await Users.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })

        if (!user) {
            return res.status(400).json({ message: "Password reset token is invalid or has expired." });
        }

        //hashing the password
        user.password = await bcrypt.hash(password, 10)

        // Clear the reset token and expiration fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        return res.status(200).json({ message: "Password has been reset." })
    }
    catch (err) {
        res.status(500).json({ message: "Error in reset password endpoint", err })
    }
}

export { ForgotPassword, ResetPassword }