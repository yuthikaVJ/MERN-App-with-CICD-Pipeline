require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./router');
const port = 5000;




app.use(express.json());

app.use('/api', router);

mongoose.connect(process.env.MONGO_URI) 
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});



