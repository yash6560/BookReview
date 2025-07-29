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
    }
}));