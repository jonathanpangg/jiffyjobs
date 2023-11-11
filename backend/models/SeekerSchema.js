import mongoose from 'mongoose';

// schema for job seekers
const SeekerSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }, 
    school: {
        type: String,
        required: true,
        default: "Boston University"
    },
    major: {
        type: String,
        required: false
    },
    grade: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    skills: {
        type: [],
        required: false
    },
    jobs_completed: [{
        _id: {
            type: String,
            required: true
        }
    }]
});

const Seeker = mongoose.model("Seekers", SeekerSchema);
export default Seeker;