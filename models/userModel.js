import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: "firstname is required"
    },
    lastname: {
        type: String,
        required: "lastname is required"
    },
    email: {
        type: String,
        required: "email is required",
        unique: true
    },
    mobilenumber: {
        type: String,
        required: "mobile number is required"
    },
    gender: {
        type: String,
        required: "gender is required"
    },
    age: {
        type: Number,
        required: "age is required"
    },
    password: {
        type: String,
        required: "password is requird"
    },
    token: {
        type: String,
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    emailVerificationToken : {
        type : String
    },
    emailVerified : {
        type : Boolean
    }
}, { timestamps: true })

export default mongoose.model("users", UserSchema)