import mongoose from 'mongoose';

const JobsSchema = new mongoose.Schema(
    {
        title:{
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
        time: {
            type: [Date],
            required: true
        },
        date_posted: { 
            type: Date,
            required: true
        }
    }
);

const Jobs = mongoose.model("Job", JobsSchema);
export default Jobs;