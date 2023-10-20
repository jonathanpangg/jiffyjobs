import Jobs from "../models/JobSchema.js";
import {
    handleNotFound,
	handleSuccess,
	handleServerError,
    handleBadRequest,
    } from "../utils/handler.js";


/**
 * 
 * Gets all the jobs in the database
 */
export const getJobs = async (req, res) => {
    try {
        const jobs = await Jobs.find();

        if (!jobs) {
            return handleNotFound(res, "No Jobs");
        }

        return handleSuccess(res, jobs);
    } catch (error) {
        return handleServerError(res, error);
    }
}


/**
 * Takes in an id and it returns the Job object associated 
 * with this id
 */
export const getJob = async (req, res) => {
    const { id } = req.params;

    try {
        const job = await Jobs.findById(id);

		if (!job) {
			return handleNotFound(res, "Job not found.");
		}

		return handleSuccess(res, job);
    } catch (error) {
        return handleServerError(res, error);
    }
};

/**
 * Takes in an id and it removes that specific job from
 * the database then returns the message "Sucessfully deleted"
 */
export const deleteJobsByID = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteJob = await Jobs.findByIdAndRemove(id);

		if (!deleteJob) {
			return handleNotFound(res, "Job not found");
		}

		return handleSuccess(res, deleteJob);
    } catch (error) {
        return handleServerError(res, error);
    }
}; 



/**
 * This takes in 
 * (title, description, pay, location, categories, time, date_posted) as
 * the inputs and then creates a job object in the database.
 * it also returns the created job. 
 */
export const postJobs = async (req, res) => {
    const { 
        title, 
        job_poster,
        description, 
        pay, 
        location, 
        categories, 
        time, 
        date_posted
    } = req.body;

    try {

        const makeJob = new Jobs({
            title,
            job_poster,
            description,
            pay,
            location,
            categories,
            time,
            date_posted
        });
        console.log(title, job_poster, description)


        const newJob = await makeJob.save();

        return handleSuccess(res, newJob);
    } catch (error) {
        return handleServerError(res, error);
    }
};

/**
 * This takes in and id and 
 * (title, description, pay, location, categories, time, date_posted) as
 * the inputs and then edits the job object in the database.
 * Then it returns the edited Job object. 
 */
export const updateJobs = async (req, res) => {
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
		const editJob = await Jobs.findByIdAndUpdate(
			id,
			{$set: updateFields},
			{
				new: true,
			}
		);

		if (!editJob) {
			return handleNotFound(res, "Job not found");
		}

		return handleSuccess(res, editJob);
    } catch (error) {
        return handleServerError(res, error);
    }
};

/*
* Takes in seekerId and addes it to the jobs schema "applicants"
*/
export const applytoJobs = async (req, res) => {
    const seeker_id = req.params.seeker_id
    const job_id = req.params.job_id

    try {
        const job = await Jobs.findById(job_id);
    
        if (!job) {
          return handleNotFound(res, 'Job not found');
        }
    
        job.applicants.push({ _id: seeker_id });
    
        const updatedJob = await job.save();
        return handleSuccess(res, updatedJob);
    } catch (error) {
        return handleServerError(res, error);
    }
}


/*
* find jobs by each filtering option.
* filters include: location, job category. duration, pay, on/off campus
*/
export const filterJobs = async (req, res) => {
    const {
        Location,
        job_Category,
        Duration,
        Pay,
        is_on_campus
    }  = req.body;
    


}

