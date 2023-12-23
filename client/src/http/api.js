import axios from 'axios';

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})
const apiFile = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data'
    }

})
export default apiFile;