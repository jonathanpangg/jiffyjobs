import express from "express";
import { 
    seekerSignUp, 
    seekerLogin, 
    providerSignUp,
    providerLogin
} from "../controllers/authController.js";

const router = express.Router();

    // route for seekers to sign up
    router.post("/seekerSignUp", seekerSignUp);

    //route for seekers to login
    router.post("/seekerLogin", seekerLogin);

    //route for providers to sign up
    router.post("/providerSignUp", providerSignUp);

    //route for providers to login
    router.post("/providerLogin", providerLogin);
export default router;