const express = require('express');
const {addBook, getBooks, getBooksById} = require('../controllers/book.controller');
const {authMiddleware} = require('../middleware/authMiddlware')

const upload = require('../utils/multer');

const router = express.Router();

router.post('/', authMiddleware, upload.single('bookImg'), addBook);
router.get('/', getBooks);
router.get('/:id', getBooksById);

module.exports = router;