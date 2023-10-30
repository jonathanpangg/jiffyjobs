import Provider from "../models/ProviderSchema.js";
import {
    handleNotFound,
	handleSuccess,
	handleServerError,
    handleBadRequest,
    } from "../utils/handler.js";

    // This returns all of the providers
    export const getProviders = async (req, res) => {
        try {
            const providers = await Provider.find();
    
            if (!providers) {
                return handleNotFound(res, "No Providers");
            }
    
            return handleSuccess(res, providers);
        } catch (error) {
            return handleServerError(res, error);
        }
    }

    // This gets a provider by email
    export const getProviderByEmail = async (req, res) => {
        try {
            const provider = await Provider.findOne({ email: req.params.email });
            if (!provider) {
                return handleNotFound(res, "Provider not found");
            }

            return handleSuccess(res, provider);
        } catch (error) {
            return handleServerError(res, error);
        }
    }

    // This finds a provider by their id and then deletes it
    export const deleteProvider = async (req, res) => {
        const { id } = req.params;

        try {
            const provider = Provider.findByIDAndRemove(id);

            if (!provider) {
                return handleNotFound(res, "Provider not found");
            }
            
            return handleSuccess(res, provider);
        } catch (error) {
            return handleServerError(res, error);
        }
    }

    // This function updates a provider by an id
    // parameters it can update are 
    // (email, password, first_name, last_name, organization, jobs_uploaded)
    // however it should only be able to update 
    // (organization); (password) maybe; (jobs_uploaded) behind the curtains change only
    export const updateProvider = async (req, res) => {
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
            const provider = Provider.findByIDAndUpdate(
                id,
                {$set: updateFields},
                {
                    new: true
                });

            if (!provider) {
                return handleNotFound(res, "Provider not found");
            }

            return handleSuccess(res, provider)
        } catch (error) {
            return handleServerError(res, error);
        }
    }