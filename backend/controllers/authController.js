import Seeker from '../models/SeekerSchema.js';
import Provider from '../models/ProviderSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
    handleNotFound,
	handleSuccess,
	handleServerError,
    handleBadRequest,
    } from "../utils/handler.js";

//This is a function to call when seekers want to sign up
export const seekerSignUp = async (req, res) => {
    try {
        const { email, name, school, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const seekerExist = await Seeker.findOne({email});
        if (seekerExist) {
            return handleBadRequest(res, "Seeker already registered with this email")
        }

        const newSeeker = new Seeker({
            email: email,
            personal_info: {
                name: name,
                school: school
            },
            password: passwordHash,
        });

        const savedSeeker = newSeeker.save();
        
        return handleSuccess(res,{
            _id: savedSeeker.id,
            email: savedSeeker.email,
            name: savedSeeker.name,
            school: savedSeeker.school,
            token: generateToken(savedSeeker._id)
        });
    } catch (error) {
        return handleServerError(res, error);
    }
}

export const seekerLogin = async (req, res) => {
    try {
        const {email, password } = req.body;
        const seeker = await Seeker.findOne({email: email})
        
        if (!seeker) {
            return handleNotFound(res, "Seeker not found");
        }

        const match = await bcrypt.compare(password, seeker.password);
        if (!match) {
            return handleBadRequest(res, "Password/Email is incorrect. Please try again.");
        }

        delete seeker.password;
        return handleSuccess(res, {
            _id: seeker.id,
            email: seeker.email,
            password: seeker.password,
            token: generateToken(seeker._id)
        });
    } catch (error) {
        return handleServerError(res, error)  ;
    }
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    }) 
}