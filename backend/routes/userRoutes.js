import express from "express";
import {getUserinfo, updateUserInfo, allPostedJobs, allAppliedJobs, applytoJobs, acceptApplicant, rejectApplicant, allApplicants} from "../controllers/userController.js"
const router = express.Router();


// get personal information from a user
router.get("/getinfo/:email/:role", getUserinfo);

// deleteuser
// router.delete("/deleteuser/:id", deleteUser);

// update user
router.put("/getinfo/update", updateUserInfo);

// get all the jobs applied by an user
router.get("/jobsApplied/:email", allAppliedJobs)

// get all the jobs posted by an user
router.get("/jobsPosted/:email", allPostedJobs)

// submit a job application
router.put("/apply/:seekerId/:jobId", applytoJobs)

// hire an applicant to do a job
router.put("/hire/:jobId/:applicantEmail", acceptApplicant)

// reject an applicant
router.put("/reject/:jobId/:applicantEmail", rejectApplicant)

// get all applicants for a job
router.get("/applicants/:jobId", allApplicants) 


export default router;