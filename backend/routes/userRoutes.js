import express from "express";
import {getUserinfo, deleteUser} from "../controllers/userController.js"
const router = express.Router();


// get personal information from a user
router.get("/getinfo/:email", getUserinfo);

// deleteuser
router.delete("/deleteuser/:id", deleteUser);



export default router;