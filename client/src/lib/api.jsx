import axios from 'axios';

const api=axios.create(
    {
        baseURL:'http://127.0.0.1:8000/api',
        headers: {
            'Content-Type': 'application/json', // Default headers
            // 'Authorization': 'Bearer ' + localStorage.getItem('authToken'), // If using token-based auth
          },
    }
)

export default api;
