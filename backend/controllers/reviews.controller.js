const { mongoose } = require('mongoose');
const reviewModel = require('../models/reviews.model');

const addReview = async (req, res) => {
    const userId = req.user._id;
    const {bookId} = req.params;
    const {review_text, rating} = req.body;
    try {

        if(!userId) {
            return res.status(400).json({message: "please login first"});
        }

        if(!review_text || !rating) {
            return res.status(400).json({message: "all fields are required!"});
        }

        const addReview = await reviewModel.create({
            book : bookId,
            reviewer : userId,
            review_text,
            rating
        });

        return res.status(201).json({message : "review is add", success: true, addReview});
        
    } catch (error) {
        console.log("error in add review : ", error);
        return res.status(500).json({message : "add review error", success: false});
    }
}
const getReviewsByBook = async (req, res) => {
    const { bookId } = req.params;
    try {
        const reviews = await reviewModel.find({book : bookId}).populate('reviewer', 'name').sort({ createdAt: -1 });

        const averageRating = await reviewModel.aggregate([
            { $match : { book : bookId}},
            { $group : { _id : null, avgRating : {$avg : "$rating"}}},
        ]);

        res.status(200).json({ success: true, reviews, averageRating: averageRating[0]?.avgRating || 0,
    });
        
    } catch (error) {
        console.log("error in add review book : ", error);
        return res.status(500).json({message : "add review book error", success: false});
    }
}

module.exports = { addReview, getReviewsByBook }