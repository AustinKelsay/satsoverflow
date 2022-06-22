import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/api'
    : `https://${process.env.SITE_NAME}/api`

const publicFetch = axios.create({
  baseURL
})

console.log(process.env.SITE_NAME)

export { publicFetch, baseURL }
