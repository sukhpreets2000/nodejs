import express from "express";
import { Login, Register, Userdata } from "../controllers/usersController.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/register", Register)
router.post("/login", Login)
router.get("/user", verifyToken, Userdata)

export default router