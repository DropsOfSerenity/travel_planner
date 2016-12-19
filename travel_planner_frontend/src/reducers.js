import { combineReducers } from 'redux'
import {
  CHANGE_FORM,
  SET_AUTH,
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,

  FETCH_TRIPS,
  FETCH_TRIPS_SUCCESS,
  FETCH_TRIPS_ERROR,
  RESET_TRIPS,
  TRIPS_FILTER,

  NEW_TRIP,
  NEW_TRIP_SUCCESS,
  NEW_TRIP_CHANGE_FORM,
  NEW_TRIP_ERROR,
  RESET_NEW_TRIP,

  FETCH_TRIP,
  FETCH_TRIP_SUCCESS,
  FETCH_TRIP_ERROR,
  RESET_ACTIVE_TRIP
} from './actions/constants'
let initialState = {
  isAuthenticated: localStorage.getItem('access_token') ? true : false,
  formState: {email: '', password: ''}
};

function auth(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM:
      return {...state, formState: action.newFormState}
    case SET_AUTH:
      return {...state, isAuthenticated: action.newAuthState}
    case SENDING_REQUEST:
      return {...state, currentlySending: action.sending}
    case REQUEST_ERROR:
      return {...state, error: action.error}
    case CLEAR_ERROR:
      return {...state, error: ''}
    default:
      return state;
  }
}

let initialTrips = {
  tripsList: {trips: [], error: null, loading: false, searchText: ''},
  activeTrip: {trip: null, loading: false, error: null},
  newTrip: {trip: {destination: '', start_date: null, end_date: null, comment: ''}, error: null, loading: false}
}

function trips(state = initialTrips, action) {
  switch (action.type) {
    case FETCH_TRIPS:
      return {...state, tripsList: {...state.tripsList, loading: true}}
    case FETCH_TRIPS_SUCCESS:
      return {...state, tripsList: {trips: action.trips, error: null, loading: false, searchText: ''}}
    case FETCH_TRIPS_ERROR:
      return {...state, tripsList: {trips: [], error: action.error, loading: false}}
    case RESET_TRIPS:
      return {...state, tripsList: {trips: [], error: null, loading: false, searchText: ''}}
    case TRIPS_FILTER:
      return {...state, tripsList: {...state.tripsList, searchText: action.searchText}}
    
    case NEW_TRIP:
      return {...state, newTrip: {...state.newTrip, loading: true}}
    case NEW_TRIP_SUCCESS:
      return {...state, newTrip: {trip: {destination: '', start_date: null, end_date: null, comment: ''}, error: null, loading: false}}
    case NEW_TRIP_ERROR:
      return {...state, newTrip: {...state.newTrip, error: action.error, loading: false}}
    case NEW_TRIP_CHANGE_FORM:
      return {...state, newTrip: {...state.newTrip, trip: action.newFormState}}
    case RESET_NEW_TRIP:
      return {...state, newTrip: {trip: {destination: '', start_date: null, end_date: null, comment: ''}, error: null, loading: false}}
    
    case FETCH_TRIP:
      return { ...state, activeTrip:{...state.activeTrip, loading: true}};
    case FETCH_TRIP_SUCCESS:
      return { ...state, activeTrip: {trip: action.trip, error: null, loading: false}};
    case FETCH_TRIP_ERROR:
      return { ...state, activeTrip: {trip: null, error: action.error, loading: false}};
    case RESET_ACTIVE_TRIP:
      return { ...state, activeTrip: {trip: null, error:null, loading: false}};

    default:
      return state
  }
}

let initialDeleteTrip = {
  currentlySending: false
}
function deleteTrip(state = initialDeleteTrip, action) {
  switch (action.type) {
    default:
      return state
  }
}

const tripApp = combineReducers({
  auth,
  trips,
  deleteTrip
})

export default tripApp;