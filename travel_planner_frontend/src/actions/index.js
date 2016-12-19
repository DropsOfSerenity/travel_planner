import {
  CHANGE_FORM,
  SET_AUTH,
  SENDING_REQUEST,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  LOGOUT,
  REQUEST_ERROR,
  CLEAR_ERROR,
  FETCH_TRIPS,
  TRIPS_FILTER,
  NEW_TRIP,
  NEW_TRIP_CHANGE_FORM,
  RESET_NEW_TRIP,
  DELETE_TRIP,
  RESET_TRIPS,
  FETCH_TRIP,
  RESET_ACTIVE_TRIP,
  RESET_EDIT_TRIP,
  EDIT_TRIP_FETCH,
  EDIT_TRIP,
  EDIT_TRIP_CHANGE_FORM
} from './constants'

export function changeForm(newFormState) {
  return {type: CHANGE_FORM, newFormState}
}

export function setAuthState (newAuthState) {
  return {type: SET_AUTH, newAuthState}
}

export function sendingRequest (sending) {
  return {type: SENDING_REQUEST, sending}
}

export function loginRequest (data) {
  return {type: LOGIN_REQUEST, data}
}

export function requestError (error) {
  return {type: REQUEST_ERROR, error}
}

export function clearError () {
  return {type: CLEAR_ERROR}
}

export function logout () {
  return {type: LOGOUT}
}

export function registerRequest () {
  return {type: REGISTER_REQUEST}
}

export function fetchTrips () {
  return {type: FETCH_TRIPS}
}

export function fetchTrip (id) {
  return {type: FETCH_TRIP, id}
}

export function tripsFilter (searchText) {
  return {type: TRIPS_FILTER, searchText}
}

export function resetActiveTrip () {
  return {type: RESET_ACTIVE_TRIP}
}

export function resetTrips () {
  return {type: RESET_TRIPS}
}

export function newTrip (data) {
  return {type: NEW_TRIP, data: {trip: {...data}}}
}

export function resetNewTrip () {
  return {type: RESET_NEW_TRIP}
}

export function newTripChangeForm (newFormState) {
  return {type: NEW_TRIP_CHANGE_FORM, newFormState}
}

export function deleteTripRequest (id) {
  return {type: DELETE_TRIP, id}
}

export function resetEditTrip () {
  return {type: RESET_EDIT_TRIP}
}

export function editTripFetch (id) {
  return {type: EDIT_TRIP_FETCH, id}
}

export function editTripChangeForm (newFormState) {
  return {type: EDIT_TRIP_CHANGE_FORM, newFormState}
}

export function editTrip (id, data) {
  return {type: EDIT_TRIP, id, data: {trip: {...data}}}
}