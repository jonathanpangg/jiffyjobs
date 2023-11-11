import Seeker from '../models/SeekerSchema.js';
import Provider from '../models/ProviderSchema.js'
import bcrypt from 'bcrypt'
import {
    handleNotFound,
	handleSuccess,
	handleServerError,
    handleBadRequest,
    } from "../utils/handler.js";

//This is a function to call when seekers want to sign up
export const seekerSignUp = async (req, res) => {
    try {
        const { email, password, name, school } = req.body;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newSeeker = new Seeker({
            email,
            name,
            school,
            password: passwordHash
        });

        const savedSeeker = newSeeker.save();
        
        return handleSuccess(res, savedSeeker);
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
        return handleSuccess(res, seeker);
    } catch (error) {
        return handleServerError(res, error)  ;
    }
}