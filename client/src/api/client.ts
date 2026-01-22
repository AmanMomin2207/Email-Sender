import axios from 'axios';

export const API_URL = 'https://email-senderbaoq.onrender.com';

const api = axios.create({
    baseURL: `${API_URL}/api`,
    withCredentials: true,
});

export const authApi = axios.create({
    baseURL: `${API_URL}/api/auth`,
    withCredentials: true,
});

export default api;
