const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');

const DBconnect = require('./utils/db');
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const reviewRoutes = require('./routes/reviews.routes');

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // your frontend origin
  credentials: true               // allow cookies
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(process.env.PORT, ()=>{
    DBconnect();
    console.log(`Server is running at port : ${process.env.PORT}`);
})