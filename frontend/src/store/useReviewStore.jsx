import { create } from 'zustand';
import axiosInstance from '../utils/axios';

export const useReviewStore = create((set) => ({
    reviews : [],

    fetchReviewsByBookId : async(bookId) => {
        try {
            const res = await axiosInstance.get(`/reviews/book/${bookId}`);
            return res.data;
        } catch (error) {
            console.error('fetch reviews by book id failed:', error);
        }
    },

    addReviews : async(bookId, data) => {
        console.log('add review :', bookId);
        console.log('add  data:', data);
        try {
            const res = await axiosInstance.post(`/reviews/book/${bookId}`, data);
            console.log('add review response:', res.data);
            return res.data;
        } catch (error) {
            console.error('add review failed:', error);
        }
    }
}));