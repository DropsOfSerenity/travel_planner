import {
  CHANGE_FORM,
  SET_AUTH,
  SENDING_REQUEST,
  LOGIN_REQUEST,
  REGISTER,
  REGISTER_CHANGE_FORM,
  RESET_REGISTER,
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
  EDIT_TRIP_CHANGE_FORM,
  FETCH_TRIP_PLAN,
  FETCH_ME,
  FETCH_USERS,
  DELETE_USER,
  EDIT_USER_FETCH,
  EDIT_USER_CHANGE_FORM,
  EDIT_USER
} from './constants'

export function editUser (id, data) {
  return {type: EDIT_USER, id, data}
}

export function editUserChangeForm (newFormState) {
  return {type: EDIT_USER_CHANGE_FORM, newFormState}
}

export function editUserFetch (id) {
  return {type: EDIT_USER_FETCH, id}
}

export function deleteUser(id) {
  return {type: DELETE_USER, id}
}

export function fetchUsers() {
  return {type: FETCH_USERS}
}

export function fetchMe() {
  return {type: FETCH_ME}
}

export function registerRequest(data) {
  return {type: REGISTER, data}
}

export function resetRegister() {
  return {type: RESET_REGISTER}
}

export function registerChangeForm(newFormState) {
  return {type: REGISTER_CHANGE_FORM, newFormState}
}

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

export function fetchTripPlan () {
  return {type: FETCH_TRIP_PLAN}
}