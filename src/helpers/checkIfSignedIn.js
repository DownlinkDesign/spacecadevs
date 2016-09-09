import axios from 'axios'
import { HOST } from './constants'

export function checkIfSignedIn() {
  axios.post(`${HOST}/users/validateUser`, userInfo)
  .then((response) => {
    if (response.data.success) {
      return true
    } else {
      return false
    }
  })
  .catch((err) => {
    return false 
  })
}
