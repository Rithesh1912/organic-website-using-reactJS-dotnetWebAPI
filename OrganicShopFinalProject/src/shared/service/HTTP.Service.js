import axios from "axios";

// Create axios instance with base configuration
const axiosHTTP = axios.create({
    baseURL: "http://localhost:5062/api"  // Your backend URL
});

// Request Interceptor to attach JWT Token
axiosHTTP.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("accessToken"); // Get JWT token
        return {
            ...config,
            headers: {
                ...(token && { 'Authorization': `Bearer ${token}` }), // Attach token
                ...config.headers
            }
        };
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor to extract data
axiosHTTP.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);

// Global HTTP Requests
export const GET = (url, header = {}) => axiosHTTP.get(url, { headers: header });
export const DELETE = (url, header = {}) => axiosHTTP.delete(url, { headers: header });
export const POST = (url, payload, header = {}) => axiosHTTP.post(url, payload, { headers: header });
export const PUT = (url, payload, header = {}) => axiosHTTP.put(url, payload, { headers: header });
