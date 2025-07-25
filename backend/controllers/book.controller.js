const bookModel = require('../models/book.model');

const addBook = async (req, res) => {
    const userId = req.user._id;
    const {title, author, genre} = req.body;
    try {
        if( !title || !author || !genre ) {
            return res.status(400).json({message: "All fields are required"});
        }

        if( !userId ) {
            return res.status(400).json({message: "please login first"});
        }

        const addbook = await bookModel.create({
            title,
            author,
            genre,
            createdBy: userId,
        })

        return res.status(201).json({message : "book added successfully", success : true, addbook});
    } catch (error) {
        console.log("error in add book : ", error);
        return res.status(500).json({message : "add book error", success: false});
    }
}

const getBooks = async (req, res) => {
    const {genre, author, page=1, limit=10} = req.body;
    const filter = {}

    if(genre) filter.genre = genre;
    if(author) filter.author = author;

    try {

        const findBooks = await bookModel.find(filter).skip((page-1)* limit).limit(parseInt(limit));

        const total = await bookModel.countDocuments(filter);

        return res.status(200).json({ success : true, findBooks, total, currentPage : parseInt(page), totalPages: Math.ceil(total/limit)})
        
    } catch (error) {
        console.log("error in add book : ", error);
        return res.status(500).json({message : "add book error", success: false});
    }
}

const getBooksById = async (req, res) => {
    const bookId = req.params.id;
    try {
        
        const findBook = await bookModel.findById(bookId);

        if (!findBook) return res.status(404).json({ message: 'Book not found' });

        return res.status(200).json({ success: true, findBook });

    } catch (error) {
        console.log("error in get book : ", error);
        return res.status(500).json({message : "add book error", success: false});
    }
}

module.exports = {addBook, getBooks, getBooksById}