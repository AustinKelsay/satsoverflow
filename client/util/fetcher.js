import axios from 'axios'

const baseURL = 'https://satsoverflow.herokuapp.com/api'

const publicFetch = axios.create({
  baseURL
})

export { publicFetch, baseURL }
