import express from "express";
import { userProfileController } from "../controllers/userProfileController.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

router.put("/user-profile", verifyToken, userProfileController)

export default router;