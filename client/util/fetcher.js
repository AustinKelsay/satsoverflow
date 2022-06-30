import axios from 'axios'

const baseURL = 'http://satsoverflow.heroku.app/api'

const publicFetch = axios.create({
  baseURL
})

export { publicFetch, baseURL }
