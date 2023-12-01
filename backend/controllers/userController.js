import {
    handleNotFound,
	handleSuccess,
	handleServerError,
    handleBadRequest,
    } from "../utils/handler.js";
import { getProviders, getProviderByEmail, deleteProvider, updateProvider } from "./providerController.js";
import { getSeekers, getSeekerByEmail, deleteSeeker, updateSeeker } from "./seekerController.js"
import Seeker from "../models/SeekerSchema.js";
import Provider from "../models/ProviderSchema.js";
import Jobs from "../models/JobSchema.js"

// get user information when called
export const getUserinfo = async(req, res) => {
    const mail = req.params.email;
    const role = req.params.role;

    try {
        if (role === "seeker") {
          
            try {
                const seeker = await Seeker.findOne({ email: mail });
                if (!seeker) {
                    return handleNotFound(res, "Seeker not found");
                }
                return handleSuccess(res, seeker);
            } catch (error) {
                return handleServerError(res, error);
            }
        } else if (role === "provider"){

            try {
                const provider = await Provider.findOne({ email: mail });
                if (!provider) {
                    return handleNotFound(res, "Provider not found");
                }
                return handleSuccess(res, provider)
            } catch (error) {
                return handleServerError(res, error);
            }

        } else {
            return handleNotFound(res, "user not found")
        }
    } catch(error) {
        return handleServerError(res, error)
    }
}


// updates the user information
export const updateUserInfo = async(req, res) => {
    const { userEmail, role, major, grade, bio } = req.body;
    try{
        if (role === "seeker") {
            const updateData = {
                ...(major && { 'personal_info.major': major || "" }), // only add major to update if provided
                ...(grade && { 'personal_info.grade': grade || "" }), // only add grade to update if provided
                ...(bio && { 'personal_info.personal_statement': bio || "" }), // only add bio to update if provided
              };
              
              const updatedSeeker = await Seeker.findOneAndUpdate(
                { email: userEmail },
                { $set: updateData },
                { new: true, runValidators: true }
              );
              if (!updatedSeeker) {
                return handleNotFound(res, 'Seeker not found');
              }
        
              return handleSuccess(res, updatedSeeker);
        } else if (role === "provider") {
            console.log("not yet implemented")
        }

    } catch(error) {
        return handleServerError(res, error);
    }
    return res;
}


/*
* Takes in seekerId and addes it to the jobs schema "applicants"
*/
export const applytoJobs = async (req, res) => {
    const { seeker_email, job_id } = req.body; 

    try {
        // Find the job by ID
        const job = await Jobs.findById(job_id);
        // If the job does not exist, handle the error
        if (!job) {
          return handleNotFound(res, 'Job not found');
        }
        // Add the seeker to the job's applicants if they haven't applied already
        if (!job.applicants.includes(seeker_email)) {
            job.applicants.push(seeker_email);
            await job.save();
        }
        // Find the seeker by email
        const applicant = await Seeker.findOne({ email: seeker_email });
        // If the seeker does not exist, handle the error
        if (!applicant) {
          return handleNotFound(res, 'Seeker not found');
        }

        // Check if the job_id already exists in the jobs_applied array
        if (applicant.jobs_applied.some(jobApplied => jobApplied._id.toString() === job_id)) {
          return res.status(400).json({ message: 'You have already applied to this job.' });
        }

        // fix so that if there is someone already hired, throw error

        // Add the job to the seeker's jobs_applied
        applicant.jobs_applied.push({ _id: job_id });


        // Save the updated applicant
        await applicant.save();
        // Respond with success and the updated job
        return handleSuccess(res, job);
    } catch (error) {
        // Handle any server errors
        return handleServerError(res, error);
    }
};





// get all jobs applied
export const allAppliedJobs = async(req, res) => {
    const userEmail = req.params.email; // Assuming you're passing the user's email as a URL parameter
    
    try {
    
        // If the user is a seeker, find their applied jobs
        const seeker = await Seeker.findOne({ email: userEmail });
        if (!seeker) {
            return handleNotFound(res, "Seeker not found");
        }
        const appliedJobIds = seeker.jobs_applied.map(job => job._id);

        const appliedJobs = await Jobs.find({ '_id': { $in: appliedJobIds } });

        if (appliedJobs.length === 0) {
            return handleNotFound(res, "No applied jobs found for the seeker");
        }

        // Add the application status to each job
        const currentDateTime = new Date();

        const jobsWithStatus = appliedJobs.map(job => {
            // Clone the job object
            const jobWithStatus = {...job._doc};

            // Determine the status based on the conditions provided
            if (job.acceptedApplicant === userEmail) {
                jobWithStatus.status = 'accepted';
            } else if (job.time[0] < currentDateTime && job.acceptedApplicant === "" && !job.rejectedApplicants.includes(userEmail)) {
                jobWithStatus.status = 'submitted';
            } else {
                jobWithStatus.status = 'rejected';
            }
            return jobWithStatus;
         });


        return handleSuccess(res, jobsWithStatus);

    } catch (error) {
        return handleServerError(res, error);
    }

}


// get all jobs posted
export const allPostedJobs = async(req, res) => {
    const userEmail = req.params.userEmail
    try {
    // Find all jobs posted by the user
    const myPostedJobs = await Jobs.find({ job_poster_email: userEmail });    
    
    if (myPostedJobs.length === 0) {
        // Handle the case where no jobs are found
        return handleNotFound(res, "No jobs found for the provided email.");
    }
    
    // Return the jobs posted by the user
    return handleSuccess(res, myPostedJobs);

    } catch (error) {
        // Handle any server errors
        return handleServerError(res, error);
    }

}

// accept an applicant
export const acceptApplicant = async(req, res) => {
    const jobId = req.params.jobId;
    const applicantEmail = req.params.applicantEmail;

    try {
        const myPostedJob = await Jobs.findById(jobId);

        // Check if the job already has an accepted applicant
        if (myPostedJob.acceptedApplicant && myPostedJob.acceptedApplicant !== "") {
            return res.status(400).json({ message: "This job has already been filled." });
        }

        // Update the job with the accepted applicant
        myPostedJob.acceptedApplicant = applicantEmail;
        myPostedJob.hired = true;
        const updatedJob = await myPostedJob.save();

        return handleSuccess(res, updatedJob);

    } catch(error) {
        return handleServerError(res, error);
    }

}

// reject an applicant
export const rejectApplicant = async(req, res) => {
    const jobId = req.params.jobId;
    const applicantEmail = req.params.applicantEmail;

    try {
        const myPostedJob = await Jobs.findById(jobId);

        // Update the job with the accepted applicant
        myPostedJob.rejectedApplicants.push(applicantEmail);
        const updatedJob = await myPostedJob.save();

        return handleSuccess(res, updatedJob);

    } catch(error) {
        return handleServerError(res, error);
    }

}

// get all applicants applied
export const allApplicants = async(req, res) => {
    const jobId = req.params.jobId;
    console.log(jobId)
    try {
        const jobs = await Jobs.findById(jobId)
        const seekerEmailObjects = jobs.applicants

        const seekerEmails = seekerEmailObjects.map(obj => obj._id);
        const seekers = await Seeker.find({ email: { $in: seekerEmails } });

        return handleSuccess(res, seekers);

    } catch (error) {
        return handleServerError(res, error)
    }
}

export const saveJobs = async(req, res) => {
    const { job_id, email } = req.body;
    try {
        const seeker = await Seeker.findOne({email: email});
        if (!seeker) {
            return handleNotFound("Seeker not found");
        }
        const job = await Jobs.findById(job_id);
        if (!job) {
            return handleNotFound("Job not found");
        }
    
        const jobString = job_id.toString(); 
        const savedJobsIds = seeker.jobs_saved.map(savedJob => savedJob._id.toString());

        if (savedJobsIds.includes(jobString)) {
            const updateResult = await Seeker.updateOne(
                { email },
                { $pull: { jobs_saved: { _id: job_id } } }
            );
        } else {
            seeker.jobs_saved.push(job_id);
        }

        await seeker.save();
        return handleSuccess(res, seeker);
    } catch (error) {
        return handleServerError(res, error);
    }
}

export const getSavedJobs = async(req, res) => {
    const email = req.params.email;
    try {
        const seeker = await Seeker.findOne({ email: email });
        if (!seeker) {
            return handleNotFound(res, "Seeker not found");
        }
        const savedJobsId = seeker.jobs_saved.map(job => job._id);

        const savedJobs = await Jobs.find({ '_id': { $in: savedJobsId } });
        if (savedJobs.length === 0) {
            return handleNotFound(res, "No saved jobs found for the seeker");
        }

        return handleSuccess(res, savedJobs)
    } catch (error) {
        return handleServerError(res, error);
    }
}
