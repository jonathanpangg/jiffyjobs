import Seeker from "../models/SeekerSchema.js";
import {
    handleNotFound,
	handleSuccess,
	handleServerError,
    handleBadRequest,
    } from "../utils/handler.js";

    // This returns all of the seekers
    export const getSeekers = async (req, res) => {
        try {
            const seekers = await Seeker.find();
    
            if (!seekers) {
                return handleNotFound(res, "No Seekers");
            }
    
            return handleSuccess(res, seeker);
        } catch (error) {
            return handleServerError(res, error);
        }
    }

    // This gets a seeker by email
    export const getSeekerByEmail = async (req, res) => {
        try {
            const seeker = await Seeker.findOne({ email: req.params.email });
            if (!seeker) {
                return handleNotFound(res, "Seeker not found");
            }

            return handleSuccess(res, seeker);
        } catch (error) {
            return handleServerError(res, error);
        }
    }

    // This finds a seeker by their id and then deletes it
    export const deleteSeeker = async (req, res) => {
        const { id } = req.params;

        try {
            const seeker = Seeker.findByIDAndRemove(id);

            if (!seeker) {
                return handleNotFound(res, "Seeker not found");
            }
            
            return handleSuccess(res, seeker);
        } catch (error) {
            return handleServerError(res, error);
        }
    }

    // This function updates a seeker by an id
    // parameters it can update are 
    // (email, password, first_name, last_name, personal_statement, school, jobs_completed)
    // however it should only be able to update 
    // (personal_statement, school); (password) maybe; (jobs_completed) behind the curtains change only
    export const updateSeeker = async (req, res) => {
        const { id } = req.params;
        // set values to be updated to empty
        const updateFields = {}; 

        try {
            // for any key that's not an empty value we add to 
            // the to be updated listed
            for (const key in req.body) {
                if (req.body[key] !== undefined) {
                    updateFields[key] = req.body[key];
                }
            };

            if (Object.keys(updateFields).length === 0) {
                return handleBadRequest(res, "Nothing to update");
            }
    
            updateFields.updatedAt = Date.now();
    
            // the $set allows us to set specific keys to a new value
            const seeker = Seeker.findByIDAndUpdate(
                id,
                {$set: updateFields},
                {
                    new: true
                });

            if (!seeker) {
                return handleNotFound(res, "Seeker not found");
            }

            return handleSuccess(res, seeker)
        } catch (error) {
            return handleServerError(res, error);
        }
    }