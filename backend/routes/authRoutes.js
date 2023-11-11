import express from "express";
import { 
    seekerSignUp, 
    seekerLogin 
} from "../controllers/authController.js";

const router = express.Router();

    router.post("/seekerSignUp", seekerSignUp);

    router.post("/seekerLogin", seekerLogin);

export default router;