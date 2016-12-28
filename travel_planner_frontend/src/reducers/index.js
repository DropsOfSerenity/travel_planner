import { combineReducers } from 'redux'
import {reducer as toastrReducer} from 'react-redux-toastr'

import auth from './auth'
import trips from './trips'
import users from './users'



const tripApp = combineReducers({
  auth,
  trips,
  users,
  toastr: toastrReducer
})

export default tripApp;