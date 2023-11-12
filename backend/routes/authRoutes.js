import express from "express";
import { 
    seekerSignUp, 
    Login, 
    providerSignUp,
} from "../controllers/authController.js";

const router = express.Router();

    // route for seekers to sign up
    router.post("/seekerSignUp", seekerSignUp);

    //route for login
    router.post("/Login", Login);

    //route for providers to sign up
    router.post("/providerSignUp", providerSignUp);
export default router;