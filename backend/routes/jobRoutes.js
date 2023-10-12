import express from "express";
import { 
        getJob, 
        deleteJobsByID, 
        postJobs, 
        updateJobs
} from "../controllers/jobController.js";

const router = express.Router();

// routes for the job board

    // get job by id
    router.get("/:id/Job", getJob);

    // delete job by id
    router.delete("/id", deleteJobsByID);

    // post a new job
    router.post("/create", postJobs);

    // update a job
    router.put("/:id", updateJobs);

    // module.exports = router;
export default router;