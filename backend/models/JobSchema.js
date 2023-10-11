import mongoose from 'mongoose';

const jobsSchema = new mongoose.Schema(
    {
        job_title:{
            type: String,
            required: true
        },
        job_poster_id: {
            type: string,
            required: true
        },
        job_description:{
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