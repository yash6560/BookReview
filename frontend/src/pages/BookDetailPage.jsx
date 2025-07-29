import React, { useEffect, useState } from 'react'
import { useBookStore } from '../store/useBookStore'
import { useParams } from 'react-router-dom';
import { useReviewStore } from '../store/useReviewStore';
import { UserRound, Star } from 'lucide-react';

const BookDetailPage = () => {

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const {id} = useParams();

  const {fetchBookById} = useBookStore();
  const {fetchReviewsByBookId} = useReviewStore();

  useEffect(() => {
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
    getBook();
  }, [id, fetchBookById, fetchReviewsByBookId])

  console.log("reviews Details:", reviews);
  if (!book) return <div className="text-white p-4">Loading book details...</div>;
  
  return (
    <div className='m-3 rounded-2xl felx items-center justify-center bg-white/10 '>
    <div className=' md:p-8 p-4 space-y-4'>
      <div>
      <div className='font-bold text-white text-3xl'>{book?.title}</div>
      <div><span className=' text-[16px] text-gray-400'>Author : </span>{book?.author}</div>
      </div>
      <div className=' inline-block rounded-full text-xs text-green-400 border px-2 py-1'>{book?.genre}</div>
      <div className=' border-b pb-4 border-white/50'>{book?.description}</div>

      
      <div className='font-bold text-white text-3xl'>Reviews</div>
      <div className='flex flex-col gap-4 p-4 rounded-2xl bg-white/10'>
        { reviews.reviews.map((reviews) => {
          return (
            <div key={reviews._id} className='space-y-2'>
            <div  >
              <div className='flex items-center gap-2'>
                <span className=' text-xs'><UserRound className='size-5'/></span>
                <span className='text-base font-bold'>{reviews.reviewer.name}</span>
              </div>
              <div className='flex items-center gap-3 text-white/35 text-xs'><span>{reviews.createdAt.slice(0, 10)}</span> | <span>{reviews.createdAt.slice(11, 19)}</span></div>
            </div>
            <div className=' text-sm flex gap-4 items-center'><span className='text-green-400'>Ratings : </span><span className='text-yellow-300 flex items-center gap-2'><Star className='fill-amber-300 size-4'/> {reviews.rating}</span></div>
            <div className='border-b pb-4 border-white/40'>{reviews.review_text}</div>
            </div>
          )
        })}
      </div>
      
    </div>
    </div>
  )
}

export default BookDetailPage