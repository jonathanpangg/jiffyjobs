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
        const { email, first_name, last_name, school, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const seekerExist = await Seeker.findOne({email});
        const providerExist = await Provider.findOne({email});
        if (seekerExist) {
            return handleBadRequest(res, `${email} is already registered as a seeker`)
        }
        if (providerExist) {
            return handleBadRequest(res, `${email} is already registered as a provider`)
        }

        const newSeeker = new Seeker({
            email: email,
            personal_info: {
                first_name: first_name,
                last_name: last_name,
                school: school
            },
            password: passwordHash,
        });

        const savedSeeker = newSeeker.save();
        
        return handleSuccess(res,{
            _id: (await savedSeeker).id,
            email: (await savedSeeker).email,
            token: generateToken(savedSeeker._id),
            role: "seeker"
        });
    } catch (error) {
        return handleServerError(res, error);
    }
}

//this is to log in
export const Login = async (req, res) => {
    try {
        const {email, password } = req.body;
        const seeker = await Seeker.findOne({ email: email });
        const provider = await Provider.findOne({ email: email });
        
        if (!seeker && !provider) {
            return handleNotFound(res, `${email} has not been registered`);
        } else if (!provider) {
            const match = await bcrypt.compare(password, seeker.password);
            if (!match) {
                return handleBadRequest(res, "Password/Email is incorrect. Please try again.");
            }
    
            delete seeker.password;
            return handleSuccess(res, {
                _id: seeker.id,
                email: seeker.email,
                token: generateToken(seeker._id),
                role: "seeker"
            });
        } else {
            const match = await bcrypt.compare(password, provider.password);

            if (!match) {
                return handleBadRequest(res, "Password/Email is incorrect. Please try again.");
            };

            delete provider.password;
            return handleSuccess(res, {
                _id: provider.id,
                email: provider.email,
                token: generateToken(provider._id),
                role: "provider"
            });
        }

    } catch (error) {
        return handleServerError(res, error)  ;
    }
}

//this is for providers to sign up
export const providerSignUp = async(req, res) => {
    try {
        const { email, first_name, last_name, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const providerExist = await Provider.findOne({ email });
        const seekerExist = await Seeker.findOne({ email });
        if (providerExist) {
            return handleBadRequest(res, `${email} is already registered as a provider`);
        };
        if (seekerExist) {
            return handleBadRequest(res, `${email} is already registered as a seeker`);
        };

        const newProvider = new Provider({
            email: email,
            password: passwordHash,
            personal_info: {
                first_name: first_name,
                last_name: last_name
            }
        });
    
        const savedProvider = newProvider.save();
        return handleSuccess(res, {
            _id: (await savedProvider).id,
            email: (await savedProvider).email,
            token: generateToken(savedProvider._id),
            role: "provider"
        })
    } catch (error) {
        return handleServerError(res, error);
    }
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    }) 
}