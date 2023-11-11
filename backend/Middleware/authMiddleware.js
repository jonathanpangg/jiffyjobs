import jwt from "jsonwebtoken";
import Seeker from "../models/SeekerSchema";
import Provider from "../models/ProviderSchema";
import {
    handleNotFound,
	handleSuccess,
	handleServerError,
    handleBadRequest,
    } from "../utils/handler.js";

const protect = async (req, res, next) => {
    let token 


    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //gets token from header
            token = req.headers.authorization.split(' ')[1];

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //get user from token
            req.seeker = await Seeker.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
};

export default protect;