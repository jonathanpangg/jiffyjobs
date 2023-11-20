import express from "express";
import {getUserinfo, updateUserInfo, allPostedJobs, allApplicants, allAppliedJobs} from "../controllers/userController.js"
const router = express.Router();


// get personal information from a user
router.get("/getinfo/:email/:role", getUserinfo);

// deleteuser
// router.delete("/deleteuser/:id", deleteUser);

// update user
router.put("/getinfo/update", updateUserInfo);

// get all the jobs applied by an user
router.get("/jobsApplied/:email/:role", allAppliedJobs)



export default router;