import request from 'axios'
import auth from './auth'
import {API_ROOT} from './constants'

let trips = {
  fetchTrips () {
    if (!auth.isAuthenticated()) return Promise.reject(false)

    return request.get(`${API_ROOT}/v1/trips`, {
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

  fetchTripPlan () {
    if (!auth.isAuthenticated()) return Promise.reject(false)

    return request.get(`${API_ROOT}/v1/plans`, {
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

  newTrip (data) {
    if (!auth.isAuthenticated()) return Promise.reject(false)

    return request.post(`${API_ROOT}/v1/trips`, 
      data.data,
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

  editTrip (id, data) {
    if (!auth.isAuthenticated()) return Promise.reject(false)

    return request.patch(`${API_ROOT}/v1/trips/${id}`, 
      data,
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

  deleteTrip (id) {
    if (!auth.isAuthenticated()) return Promise.reject(false)

    return request.delete(`${API_ROOT}/v1/trips/${id}`, {
      headers: {
        'Authorization': localStorage.access_token
      }
    }).then(response => {
      return Promise.resolve(response.data)
    })
    .catch(error => {
      return Promise.reject(false)
    })
  },

  fetchTrip (id) {
    if (!auth.isAuthenticated()) return Promise.reject(false)

    return request.get(`${API_ROOT}/v1/trips/${id}`, {
      headers: {
        'Authorization': localStorage.access_token
      }
    }).then(response => {
      return Promise.resolve(response.data)
    })
    .catch(error => {
      return Promise.reject(false)
    })
  }
}

export default trips