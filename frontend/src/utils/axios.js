import axios from "axios";

// For login, signup, authMe (JSON requests)
const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'  // Correct for JSON requests
  }
});

// For image/file uploads only
const uploadInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export default axiosInstance;
export { uploadInstance };