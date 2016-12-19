import request from 'axios'
import auth from './auth'

let trips = {
  fetchTrips () {
    if (!auth.isAuthenticated()) return Promise.reject(false)

    return request.get('http://localhost:3001/v1/trips', {
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

    return request.post('http://localhost:3001/v1/trips', 
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

  deleteTrip (id) {
    if (!auth.isAuthenticated()) return Promise.reject(false)

    return request.delete(`http://localhost:3001/v1/trips/${id}`, {
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

    return request.get(`http://localhost:3001/v1/trips/${id}`, {
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