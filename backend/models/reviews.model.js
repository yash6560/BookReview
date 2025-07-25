const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    book :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Book',
        require : true,
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    review_text: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
},{
    timestamps: true,
});

const Reviews = mongoose.model('Reviews', reviewsSchema);

module.exports = Reviews;