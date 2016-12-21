import request from 'axios'

import {API_ROOT} from './constants'

let auth = {
  login (email, password) {
    if (auth.isAuthenticated()) return Promise.resolve(true)

    return request.post(`${API_ROOT}/v1/login`, {email, password})
      .then(response => {
        localStorage.access_token = response.data.access_token
        return Promise.resolve(true)
      })
      .catch(error => {
        return Promise.reject(error.response.data.error)
      })
  },

  register (email, password) {
    if (auth.isAuthenticated()) return Promise.resolve(true)

    return request.post(`${API_ROOT}/v1/users`, {user: {email, password}})
      .then(response => {
        localStorage.access_token = response.data.access_token
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error.response.data.error)
      })
  },

  isAuthenticated () {
    return !!localStorage.access_token
  }
}

export default auth