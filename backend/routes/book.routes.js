const express = require('express');
const {addBook, getBooks, getBooksById} = require('../controllers/book.controller');
const {authMiddleware} = require('../middleware/authMiddlware')

const router = express.Router();

router.post('/', authMiddleware, addBook);
router.get('/', getBooks);
router.get('/:id', getBooksById);

module.exports = router;