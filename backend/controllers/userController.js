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
    const isjobseeker = true
    const isjobprovider = false
    const mail = req.params.email;
    const role = req.params.role;
    // isjobseeker = boolean from the login database, get the user information.
    try {
        if (isjobseeker === true) {
            try {
                const seeker = await Seeker.findOne({ email: mail });
                if (!seeker) {
                    return handleNotFound(res, "Seeker not found");
                }
                return handleSuccess(res, seeker);
            } catch (error) {
                return handleServerError(res, error);
            }
        } else if (isjobprovider === true){

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
                ...(major && { 'personal_info.major': major }), // only add major to update if provided
                ...(grade && { 'personal_info.grade': grade }), // only add grade to update if provided
                ...(bio && { 'personal_info.personal_statement': bio }), // only add bio to update if provided
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


// get all jobs applied
export const allAppliedJobs = async(req, res) => {
    const userEmail = req.params.email; // Assuming you're passing the user's email as a URL parameter
    const role = req.params.role; // or req.body.role, depending on how you're passing it

    try {
        if (role === "seeker") {
            // If the user is a seeker, find their applied jobs
            const seeker = await Seeker.findOne({ email: userEmail });
            if (!seeker) {
                return handleNotFound(res, "Seeker not found");
            }
            console.log(seeker)
            const appliedJobIds = seeker.jobs_applied.map(job => job._id);

            // console.log(appliedJobIds)

            const appliedJobs = await Jobs.find({ '_id': { $in: appliedJobIds } });
            if (appliedJobs.length === 0) {
                return handleNotFound(res, "No applied jobs found for the seeker");
            }

            return handleSuccess(res, appliedJobs);
        } else if (role === "provider") {
            // Handle the case for providers if necessary
            // For example, you might want to return the jobs posted by the provider
            return handleBadRequest(res, "Providers cannot have applied jobs");
        } else {
            // If the role is neither a seeker nor a provider
            return handleBadRequest(res, "Invalid role specified");
        }
    } catch (error) {
        return handleServerError(res, error);
    }

}


// get all jobs posted
export const allPostedJobs = async(req, res) => {

}


// get all applicants applied
export const allApplicants = async(req, res) => {

}