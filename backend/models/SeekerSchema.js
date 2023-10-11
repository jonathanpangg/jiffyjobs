import mongoose from 'mongoose';

const SeekerSchema = mongoose.Schema({
        job_title:{
            type: String,
            required: true
        },
            
        
    });