import mongoose from "mongoose";

const ContactSchema = mongoose.Schema({
    username: {
        type: String,
        required: "username is requied"
    },
    email: {
        type: String,
        requied: "email is required"
    },
    password: {
        type: String,
        required: "password is required"
    }
}, { timestamps: true })

export default mongoose.model("contacts", ContactSchema)