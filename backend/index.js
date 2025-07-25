const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const DBconnect = require('./utils/db');
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const reviewRoutes = require('./routes/reviews.routes');

const app = express();

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(process.env.PORT, ()=>{
    DBconnect();
    console.log(`Server is running at port : ${process.env.PORT}`);
})