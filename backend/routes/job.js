import express from "express";
import { 
        getJob, 
        deleteJobsByID, 
        postJobs, 
        updateJobs
    } from "../controllers/job";

    const router = express.Router();

    router.get("/:id/Job", getJob);
    router.delete("/id", deleteJobsByID);
    router.post("/create", postJobs);
    router.put("/:id", updateJobs);