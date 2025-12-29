require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');


const port = 5000;
const host = 'localhost';
const mongoose = require('mongoose');
const router = require('./router');



app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URL;
const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
};
connect();


const server = app.listen(port, host, () => {
    console.log(`Node server is running on ${server.address().port}`);
});

app.use('/api', router);

