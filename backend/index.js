require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')


// express app
const app = express();

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use((req, res, next) => {
  res.send('Welcome to Express');
});


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