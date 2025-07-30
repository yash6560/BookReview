import React, { useEffect, useState } from 'react'
import { useBookStore } from '../store/useBookStore'
import { useNavigate, useParams } from 'react-router-dom';
import { useReviewStore } from '../store/useReviewStore';
import { UserRound, Star, Timer } from 'lucide-react';
import AddReview from '../components/AddReview';
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';

const BookDetailPage = () => {

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const {id} = useParams();

  const {fetchBookById} = useBookStore();
  const {fetchReviewsByBookId} = useReviewStore();

  const { user } = useAuthStore();
  const navigate = useNavigate();

  const getBook = async () => {
      try {
        const res = await fetchBookById(id);
        const reviewsRes = await fetchReviewsByBookId(id);
      setBook(res);
      if (reviewsRes && reviewsRes.reviews) {
          setReviews(reviewsRes);
        } else {
          setReviews([]);
        }
      } catch (error) {
        console.error("Failed to fetch book:", error);
      }
    }

  useEffect(() => {
    getBook();
  }, [id, fetchBookById, fetchReviewsByBookId])

  console.log("book detail:", reviews);
  if (!book) return <div className="text-white p-4">Loading book details...</div>;
  
  const handleAddReviews = (e) => {
    e.preventDefault();
    if(!user) {
      toast.error("You need to be logged in to add a review.");
      navigate('/login');
    }
  }
  
  return (
    <div className='md:m-8 m-3 rounded-2xl felx items-center justify-center bg-white/10 '>
    <div className=' md:p-8 p-4 space-y-4'>
      <div>
        <div className='text-gray-400 font-normal text-sm text-right justify-end flex items-center gap-2'><Timer />{book?.createdAt.slice(0,10)}</div>

        {book?.bookImg && (
          <div className='py-2'>
          <img src={book?.bookImg} alt={book?.title} className='w-full h-[300px] object-cover rounded-lg' />
        </div>
        )}
        
      <div className='sm:flex items-center justify-between'>
        <div className='font-bold text-white text-3xl'>{book?.title}</div>
        <div className=' flex gap-2 items-center text-green-400 font-semibold text-lg'>Avg Rating : <span className='text-yellow-300 flex items-center gap-2'><Star className='fill-amber-300 size-4'/> {(reviews?.averageRating || 0).toFixed(1)}</span></div>
      </div>
      <div><span className=' text-[16px] text-gray-400'>Author : </span>{book?.author}</div>
      </div>
      <div className=' inline-block rounded-full text-xs text-green-400 border px-2 py-1'>{book?.genre}</div>
      <div className=' border-b pb-4 border-white/50'>{book?.description}</div>
      <div className='border-b pb-4 border-white/50'>
      <button onClick={(e) => setShowModel(true)} className='bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer'>Add Review</button>
      </div>
      <div className='font-bold text-white text-3xl'>Reviews</div>
      <div className='flex flex-col divide-y gap-4 p-4 rounded-2xl bg-white/10'>
        {reviews.reviews && reviews.reviews.length > 0 ? (
    reviews.reviews.map((review) => {
      return (
        <div key={review._id} className='space-y-2'>
          <div className='sm:flex sm:gap-4 space-y-2 sm:space-y-0 justify-between items-center'>
            <div>
              <div className='flex items-center gap-2'>
                <span className=' text-xs'><UserRound className='size-5'/></span>
                <span className='text-base font-bold'>{review.reviewer.name}</span>
              </div>
              <div className='flex items-center gap-3 text-white/35 text-xs'>
                <span>{review.createdAt.slice(0, 10)}</span> | <span>{review.createdAt.slice(11, 19)}</span>
              </div>
            </div>
            <div className='text-sm flex gap-4 items-center'>
              <span className='text-green-400'>Ratings :</span>
              <span className='text-yellow-300 flex items-center gap-2'>
                <Star className='fill-amber-300 size-4' /> {review.rating}
              </span>
            </div>
          </div>
          <div className='pb-4'>{review.review_text}</div>
        </div>
      )
    })
  ) : (
    <div className='text-gray-400 text-sm italic'>No reviews yet. Be the first to review this book!</div>
  )}
      </div>
      
    </div>
    
    {
      showModel && (
        <div className="fixed inset-0 z-50 bg-white/50 flex items-center justify-center">
    <div className="bg-black/70 p-6 rounded-lg w-[90%] max-w-md shadow-xl relative">
      <button
        onClick={(e) => setShowModel(false)}
        className="absolute top-2 right-2 text-white cursor-pointer hover:text-green-500"
      >
        ✕
      </button>
      <AddReview getBook = {getBook} bookId={id} closeModal={() => setShowModel(false)} />
    </div>
  </div>
      )
    }

    </div>
  )
}

export default BookDetailPage