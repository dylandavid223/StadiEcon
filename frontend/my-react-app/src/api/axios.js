import axios from 'axios'


const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || '/api', // Uses internal URL in production
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('stadiecon-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('stadiecon-token')
      localStorage.removeItem('stadiecon-user')
    }
    return Promise.reject(err)
  }
)



export default api