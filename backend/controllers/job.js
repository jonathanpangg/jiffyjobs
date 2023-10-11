import Jobs from "../models/Job";
import {
    handleNotFound,
	handleSuccess,
	handleServerError,
    handleBadRequest,
    } from "../utils/handler";

export const getJob = async (req, res) => {
    const { id } = req.params;

    try {
        const job = await Jobs.findById(id);

		if (!job) {
			return handleNotFound(res, "Job not found.");
		}

		return handleSuccess(res, Jobs);
    } catch (error) {
        return handleServerError(res, "Internal server error");
    }
};

export const deleteJobsByID = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteJob = await Jobs.findByIdAndRemove(id);

		if (!deleteJob) {
			return handleNotFound(res, "Job not found");
		}

		return handleSuccess(res, {message: "Sucessfully deleted"});
    } catch (error) {
        return handleServerError(res, "Internal server error");
    }
};

export const postJobs = async (req, res) => {
    const { title, description, pay, location, categories, time, date_posted} = req.body;

    try {

        const makeJob = await Jobs.create({
            title,
            description,
            pay,
            location,
            categories,
            time,
            date_posted
        });

        if (!makeJob) {
            return handleBadRequest(res, "Unable to create Job");
        }

        return handleSuccess(res, makeJob);
    } catch (error) {
        return handleServerError(res, "Internal server error");
    }
};

export const updateJobs = async (req, res) => {
    const { title, description, pay, location, categories, time, date_posted} = req.body;
    const { id } = req.params;

    try {

        const updateFields = {};

		if (title) updateFields.title = title;
		if (description) updateFields.description = description;
        if (pay) updateFields.pay = pay;
        if (location) updateFields.location = location;
        if (categories) updateFields.categories = categories;
        if (time) updateFields.time = time;
        if (date_posted) updateFields.date_posted = date_posted;

		updateFields.updatedAt = Date.now();

		const editJob = await Jobs.findByIdAndUpdate(
			id,
			updateFields,
			{
				new: true,
			}
		);

		if (!healthData) {
			return handleNotFound(res, "Job not found");
		}

		return handleSuccess(res, editJob);
    } catch (error) {
        return handleServerError(res, "Internal server error");
    }
};