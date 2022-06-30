import axios from 'axios'

const baseURL = 'http://satsoverflow.herokuapp.com/api'

const publicFetch = axios.create({
  baseURL
})

export { publicFetch, baseURL }
