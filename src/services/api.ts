import axios from 'axios';

const api = axios.create({
    baseURL: 'https://json-server-render-uuc9.onrender.com',
});

export default api;