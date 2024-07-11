import express from "express";
import { ForgotPassword, ResetPassword } from "../controllers/forgot-resetController.js";
const router = express.Router();

router.post("/forgotPassword", ForgotPassword)
router.post("/resetPassword/:token", ResetPassword)
export default router