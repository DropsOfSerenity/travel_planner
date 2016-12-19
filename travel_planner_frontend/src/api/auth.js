import request from 'axios'

let auth = {
  login (email, password) {
    if (auth.isAuthenticated()) return Promise.resolve(true)

    return request.post('http://localhost:3001/v1/login', {email, password})
      .then(response => {
        localStorage.access_token = response.data.access_token
        return Promise.resolve(true)
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