require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const port = 5000;
const host = '0.0.0.0';
const mongoose = require('mongoose');
const router = require('./router');




app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

connect();

const server = app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

app.use('/api', router);

