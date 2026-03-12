import axios from "axios"

// Step 1 — create instance
const instance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

// Step 2 — request interceptor
instance.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("access_token")
    if (token) {
      config.headers.Authorization = "Bearer " + token
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

// Step 3 — response interceptor
instance.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    if (error.response && error.response.status === 401) {
      console.log("Token expired!")
    }
    return Promise.reject(error)
  }
)

// Step 4 — export
export default instance
