import axios from "axios"

const client = axios.create({
   baseURL: "https://domotekhnika.ru/api/v1/",
})

export default client
