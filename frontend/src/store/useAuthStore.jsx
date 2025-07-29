import { create } from 'zustand';
import axiosInstance from '../utils/axios';

const useAuthStore = create((set) => ({
    user : null,
    isAuthenticated : false,
    isLoading : false,

    authMe : async () => {
        set({isLoading : true});
        try {
            const res = await axiosInstance.post('/auth/me');
            set({ user: res.data.user, isAuthenticated: true });
            console.log(res); 
            return res.data;
        } catch (error) {
            console.error('Auth check failed:', error);
            set({ user: null, isAuthenticated: false });
        } finally {
            set({isLoading : false})
        }
    },

    signUp : async (formData) => {
        set({isLoading : true})
        try {
            const res = await axiosInstance.post('/auth/signup', formData);
            return res.data;
        } catch (error) {
            console.error('Signup failed:', error);
        } finally {
            set({isLoading : false})
        }
    },

    logIn : async (formData) => {
        set({isLoading : true})
        try {
            const res = await axiosInstance.post('/auth/login', formData);
            return res.data;
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            set({isLoading : false})
        }
    },

    logOut : async () => {
        try {
            const res = await axiosInstance.post('/auth/logout');
            return res.data;
        } catch (error) {
            console.error('Login failed:', error);
        }
    }
}))

export default useAuthStore;