import express from "express";
import { 
        getJob, 
        deleteJobsByID, 
        postJobs, 
        updateJobs,
        applytoJobs,
        getJobs
} from "../controllers/jobController.js";

const router = express.Router();

// routes for the job board

    // get all jobs
    router.get("/get", getJobs);

    // get job by id
    router.get("/:id", getJob);

    // delete job by id
    router.delete("/:id", deleteJobsByID);

    // post a new job
    router.post("/create", postJobs);

    // update a job
    router.put("/:id", updateJobs);

    // submit a job application
    router.post("/apply/:seeker_id/:job_id", applytoJobs)

    // withdraw a job application
    router.delete("/withdraw/:seeker_id/:job_id", )

export default router;