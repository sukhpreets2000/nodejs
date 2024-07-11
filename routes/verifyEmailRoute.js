import express from "express";
import { verifyEmailController } from "../controllers/verifyEmailController.js";
const router = express.Router();

router.get("/verfiy-email/:token", verifyEmailController)

export default router