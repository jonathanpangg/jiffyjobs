import express from "express";
import { 
        getJob, 
        deleteJobsByID, 
        postJobs, 
        updateJobs
    } from "../controllers/jobController";

    const router = express.Router();

    router.get("/:id/Job", getJob);
    router.delete("/id", deleteJobsByID);
    router.post("/create", postJobs);
    router.put("/:id", updateJobs);

    export default router;