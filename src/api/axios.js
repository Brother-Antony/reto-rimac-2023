import axios from "axios"

const instance = axios.create({
    baseURL: "https://rimac-front-end-challenge.netlify.app/api",
    withCredentials: false,
})

export default instance

