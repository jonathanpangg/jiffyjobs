import mongoose from 'mongoose';

const jobsSchema = new mongoose.Schema(
    {
        job_title:{
            type: String,
            required: true
        },
        job_description:{
            type: String,
            required: true
        },
        pay: {
            type: String,
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
            type: String,
            required: true
        },
        date_posted: { 
            type: String,
            required: true
        }
    }
);