import React, { useState } from 'react'
import { useReviewStore } from '../store/useReviewStore';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const AddReview = ({bookId, closeModal, getBook}) => {
    const [data, setData] = useState({
        review_text: '',
        rating: 1,
    });
    
    const { addReviews } = useReviewStore();
    const {user} = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user) {
            toast.error("You need to be logged in to add a review.");
            navigate('/login');
        }
        const res = await addReviews(bookId, data);
        if(res?.success) {
            toast.success(res?.message || 'Review added successfully');
            setData({
                review_text: '',
                rating: 1,
            });
            // Call the callback to refresh reviews in parent component
            if (getBook) {
                getBook();
            }
            closeModal();
        }
    }


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
                <h2 className='font-bold text-lg text-center text-green-400'>Add Your review</h2>
                <div className='flex flex-col ga-1'>
                <label className='text-white text-sm font-semibold'>Review Text</label>
                <textarea cols={2} rows={2} value={data.review_text} onChange={(e) => setData({...data, review_text:e.target.value})} placeholder='Write your review here...' className='bg-white/10 p-2 rounded-lg text-white outline-none'/>
                </div>

                <div className='flex flex-col ga-1'>
                <label className='text-white text-sm font-semibold'>Rating</label>
                <input step="0.1" type='number' min={1} max={5} value={data.rating} onChange={(e) => setData({...data, rating:e.target.value})} className='bg-white/10 p-2 rounded-lg text-white outline-none'/>
                </div>

                <button type='submit' className='bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer'>Submit Review</button>
                </div>
        </form>
    </div>
  )
}

export default AddReview