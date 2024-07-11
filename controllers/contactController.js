import Contacts from "../models/contactModel.js";
import mongoose from "mongoose";

const GetAllContacts = async (req, res) => {
    try {
        const contacts = await Contacts.find()
        return res.status(200).json({ contacts })
    }
    catch (err) {
        return res.status(500).json({ error: err })
    }
}

const CreateContact = async (req, res) => {
    try {

        const { username, email, password } = req.body

        if (username == "" || email == "" || password == "") {
            return res.status(400).json({ message: "All fields are required to fill" })
        }

        const findContact = await Contacts.findOne({ email })

        if (findContact) {
            return res.status(400).json({ message: "contact already exist" })
        }

        const contacts = await Contacts.create({
            username,
            email,
            password
        })
        return res.status(201).json({ contacts })
    }
    catch (err) {
        return res.status(400).json({ error: err })
    }
}

const GetSingleContact = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid id" })
        }

        const singlecontact = await Contacts.findById(id)
        if (!singlecontact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json({ singlecontact });
    }
    catch (err) {
        return res.status(400).send(err)
    }
}

const UpdateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid id" })
        }

        if (username == "" || email == "" || password == "") {
            return res.status(400).json({ message: "all fields are required" })
        }

        const contact = await Contacts.findById(id)

        if (!contact) {
            return res.status(404).json({ message: "Contact not found" })
        }

        const updateContact = await Contacts.findByIdAndUpdate(id, { username, email, password }, { new: true })
        return res.status(200).json({ updateContact })
    }
    catch (err) {
        return res.status(500).send({ message: err })
    }
}

const DeleteContact = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid id" })
        }

        const deleteContact = await Contacts.findByIdAndDelete(id)
        if (!deleteContact) {
            return res.status(404).json({ message: "Contact not found" })
        }

        return res.status(200).json({ deleteContact })
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}

export { GetAllContacts, CreateContact, GetSingleContact, UpdateContact, DeleteContact }