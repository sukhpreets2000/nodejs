import express from "express";
import { CreateContact, DeleteContact, GetAllContacts, GetSingleContact, UpdateContact } from "../controllers/contactController.js";
const router = express.Router();

router.get("/", GetAllContacts)
router.post("/", CreateContact)
router.get("/:id", GetSingleContact)
router.put("/:id", UpdateContact)
router.delete("/:id", DeleteContact)

export default router