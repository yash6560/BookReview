const express= require('express');
const { authMiddleware } = require('../middleware/authMiddlware');
const { addReview, getReviewsByBook } = require('../controllers/reviews.controller');

const router = express.Router();

router.post('/book/:bookId', authMiddleware, addReview);
router.get('/book/:bookId', getReviewsByBook);

module.exports = router;