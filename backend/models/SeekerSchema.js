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
    personal_info: {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: false
        },
        personal_statement: {
            type: [String],
            required: false
        },
        school: {
            type: String,
            required: true
        },
        major: {
            type: [String],
            required: false
        },
        minor: {
            type: [String],
            required: false
        },
        grade: {
            type: String,
            required: false
        },
        school_date: {
            // adds the date attended (expected) for the school
            type: [String],
            required: false
        },
        gender: {
            type: String,
            required: false
        },
        pronouns: {
            type: String,
            required: false
        },
        gpa: {
            type: String,
            required: false
        },
        has_resume: {
            type: Boolean,
            required: false
        },
        phone_num: {
            type: Number,
            required: false
        },
        preffered_categories: {
            type: [String],
            required: false
        },
        profile_public: {
            type: Boolean,
            required: false
        }
    },
    jobs_completed: [{
        _id: {
            type: String,
            required: true
        }
    }],
    jobs_applied: [{
        _id: {
            type: String,
            required: true
        }
    }]
});

const Seekers = mongoose.model("Seekers", SeekerSchema);
export default Seekers;