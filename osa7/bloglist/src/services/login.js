import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
const baseUrl = '/api/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const isTokenValid = (token) => {
  let decodedToken = jwtDecode(token)
  let currentDate = new Date()

  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    return false
  } else {
    return true
  }
}

export default { login, isTokenValid }
