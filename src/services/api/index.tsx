import axios from "axios";

const baseURL = 'https://valorant-api.com/v1/'

const api = axios.create({
    baseURL,
    timeout: 1000,
})

export default api