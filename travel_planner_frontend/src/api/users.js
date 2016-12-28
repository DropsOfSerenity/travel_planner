import request from 'axios'
import auth from './auth'
import {API_ROOT} from './constants'

let users = {
  fetchUsers () {
    if (!auth.isAuthenticated()) return Promise.reject(false)

    return request.get(`${API_ROOT}/v1/users`, {
      headers: {
        'Authorization': localStorage.access_token
      }
    })
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(error => {
      return Promise.reject(false)
    })
  },
  fetchUser (id) {
    if (!auth.isAuthenticated()) return Promise.reject(false)

    return request.get(`${API_ROOT}/v1/users/${id}`, {
      headers: {
        'Authorization': localStorage.access_token
      }
    })
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(error => {
      return Promise.reject(false)
    })
  },
  editUser (id, data) {
    if (!auth.isAuthenticated()) return Promise.reject(false)
    if (!data.password) delete data.password

    return request.patch(`${API_ROOT}/v1/users/${id}`,
      {user: data},
      { 
        headers: {
          'Authorization': localStorage.access_token
        }
      }
    )
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(error => {
      return Promise.reject(error.response.data.error)
    })
  },
  deleteUser (id) {
    if (!auth.isAuthenticated()) return Promise.reject(false)

    return request.delete(`${API_ROOT}/v1/users/${id}`, {
      headers: {
        'Authorization': localStorage.access_token
      }
    })
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(error => {
      return Promise.reject(error.response.data.error)
    })
  }
}

export default users