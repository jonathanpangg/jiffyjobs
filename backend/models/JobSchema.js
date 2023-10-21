import mongoose from 'mongoose';


// schema for jobs
const JobsSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        job_poster: {
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        pay: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        categories: {
            type: [],
            required: true
        },
        job_type: {
            // is this a quick job ( < 1 day)? Short job ( 1 ~ 7 days)? or a part time job? (7< days)?
            type: String,
            required: true
        },
        time: {
            type: [Date],
            required: true
        },
        date_posted: { 
            type: Date,
            required: true
        },
        applicants: [{
            _id: {
                type: String,
                required: true
            }
        }]
    }
);

const Jobs = mongoose.model("Jobs", JobsSchema);
export default Jobs;