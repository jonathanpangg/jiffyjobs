import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import jobRoutes from "../routes/jobRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import authRoutes from "../routes/authRoutes.js";

dotenv.config();

// express app
const app = express();

// enable CORS 
app.use(cors({
  origin: '*',
  headers: '*',
  credentials: true,
}));

console.log(process.env.DB);

app.use(express.json());

// routes
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// connect to db
mongoose.connect(process.env.DB)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
