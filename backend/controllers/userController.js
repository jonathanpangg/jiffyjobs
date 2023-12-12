import {
    handleNotFound,
	handleSuccess,
	handleServerError,
    handleBadRequest,
    } from "../utils/handler.js";
import Seeker from "../models/SeekerSchema.js";
import Provider from "../models/ProviderSchema.js";
import Jobs from "../models/JobSchema.js"
//import nodemailer from 'nodemailer';
import dotenv from 'dotenv';



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
    const { userEmail, role, major, grade, bio, organization } = req.body;
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
            const updateData = {
                ...(organization && { 'personal_info.organization': organization || "" }), // only add organization to update if provided
              };
              const updatedprovider = await Provider.findOneAndUpdate(
                { email: userEmail },
                { $set: updateData },
                { new: true, runValidators: true }
              );
              if (!updatedprovider) {
                return handleNotFound(res, 'Provider not found');
              }
        
              return handleSuccess(res, updatedprovider);        }

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
        
        // Find the seeker by email
        const applicant = await Seeker.findOne({ email: seeker_email });
        // If the seeker does not exist, handle the error
        if (!applicant) {
          return handleNotFound(res, 'Seeker not found');
        }

        // Check if the job_id already exists in the jobs_applied array
        if (applicant.jobs_applied.some(jobApplied => jobApplied._id.toString() === job_id)) {
          return res.status(400).json({ message: 'You have already applied to this job' });
        }

        // Add the seeker to the job's applicants if they haven't applied already
        if (!job.applicants.includes(seeker_email)) {
            job.applicants.push(seeker_email);
        }

        // if there is someone already hired, throw error
        if (job.hired === true) {
            return handleBadRequest(res, "The job has already been filled")
        }

        // if the person posted the job applied to the job, throws an error
        if (job.job_poster_email === seeker_email) {
            return handleBadRequest(res, "You cannot apply to the job you posted");
        }

        // Add the job to the seeker's jobs_applied
        applicant.jobs_applied.push({ _id: job_id });

        // Save the updated applicant
        await applicant.save();
        await job.save();
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
        const appliedJobIds = seeker.jobs_applied.map(job => job._id).reverse();;

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
    const userEmail = req.params.email

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

        // let transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: process.env.EMAIL,  
        //         pass: process.env.GMAILPASS
        //     }
        // });
        // let mailOptions = {
        //     from: EMAIL,
        //     to: applicantEmail,
        //     subject: 'JiffyJObs',
        //     text: 'This is a test email sent from JiffyJobs!',
        // };
        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // });

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
    try {
        const jobs = await Jobs.findById(jobId)
        const seekerEmailObjects = jobs.applicants
        
        const seekerEmails = seekerEmailObjects.map(obj => obj._id);
        const seekers = await Seeker.find({ email: { $in: seekerEmails } });
         
        // Add the application status to each job
        const currentDateTime = new Date();

        const seekersWithStatus = seekers.map(seeker => {
            // Clone the job object
            const seekerWithStatus = {...seeker._doc};
            // Determine the status based on the conditions provided
            if (jobs.acceptedApplicant === seeker.email) {
                seekerWithStatus.status = 'accepted';
            } else if (jobs.time[0] < currentDateTime && jobs.acceptedApplicant === "" && !jobs.rejectedApplicants.includes(seeker.email)) {
                seekerWithStatus.status = 'submitted';
            } else {
                seekerWithStatus.status = 'rejected';
            }
            return seekerWithStatus;
          });
 
        return handleSuccess(res, seekersWithStatus);

    } catch (error) {
        return handleServerError(res, error)
    }
}


export const withdrawApp = async(req, res) => {
    try{
        const jobId = req.params.jobId;
        const seekerEmail = req.params.seekerEmail;
        const today = new Date();

        const job = await Jobs.findOne({ _id: jobId, 'time.0': { $lt: today }, hired: false });

        if (!job) {
            return handleNotFound(res, 'You cannot withdraw application from an in-progress job');
        }
        await Jobs.updateOne({ _id: jobId }, { $pull: { applicants: { _id : seekerEmail} } });
        const seek = await Seeker.updateOne(
            { email: seekerEmail }, 
            { $pull: { jobs_applied: { _id: jobId } } }
        );        
        return handleSuccess(res, 'Application withdrawn successfully');

    } catch(error) {
        handleServerError(res, error);
    }
}


// save a job
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

// retrieve the saved jobs given a user
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