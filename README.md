# BookReview

## Description
BookReview is a Node.js and Express-based web application for managing and sharing book reviews. Users can add reviews, view reviews by book, and see average ratings for each book.

## Setup Instructions

1. **Clone the repository**
   ```sh
   git clone [repository-url]
   cd bookreview
   ```

2. **Install dependencies**
   Make sure you have Node.js and npm installed. Then run:
   ```sh
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `backend` directory with the following (example) content:
   ```
   MONGODB_URI=mongodb://localhost:27017/bookreview
   JWT_SECRET=your_jwt_secret
   PORT=5000
   PORT = 5001
   CLIENT_URL = http://localhost:5173
   CLOUDINARY_CLOUD_NAME = 
   CLOUDINARY_API_KEY = 
   CLOUDINARY_API_SECRET = 
   ```
   Adjust values as needed for your environment.

4. **Start the backend server**
   ```sh
   cd backend
   nodemon index.js
   ```
   The backend will run on the port specified in your `.env` file (default: 5000).

5. **(Optional) Start the frontend**
   If you have a frontend (e.g., React), navigate to the frontend directory and run:
   ```sh
   npm install
   npm  run dev
      ```

## Usage

- Use API endpoints to add and fetch reviews.
- Example:  
  - `POST /api/reviews/book/:bookId` to add a review (requires authentication)
  - `GET /api/reviews/book/:bookId` to fetch all reviews and average rating for a book

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

Public
