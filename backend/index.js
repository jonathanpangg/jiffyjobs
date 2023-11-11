import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from "cors"

import jobRoutes from "./routes/jobRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/authRoutes.js"
dotenv.config();



// express app
const app = express();

app.use(cors({
  origin: '*'
}));

// middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})



// routes
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)


// connect to db
mongoose.connect(process.env.DB)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })