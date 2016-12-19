import {take, call, put, fork} from 'redux-saga/effects'
import {browserHistory} from 'react-router'
import auth from '../api/auth'
import trips from '../api/trips'

import {
  LOGIN_REQUEST,
  CHANGE_FORM,
  SENDING_REQUEST,
  SET_AUTH,
  REQUEST_ERROR,
  LOGOUT,
  
  FETCH_TRIPS, FETCH_TRIPS_SUCCESS, FETCH_TRIPS_ERROR, RESET_TRIPS,
  NEW_TRIP, NEW_TRIP_SUCCESS, NEW_TRIP_ERROR,
  DELETE_TRIP,
  FETCH_TRIP, FETCH_TRIP_SUCCESS, FETCH_TRIP_ERROR
} from '../actions/constants'

// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export function * login ({email, password}) {
  yield put({type: SENDING_REQUEST, sending: true})

  let response
  try {
    response = yield call(auth.login, email, password)
    return response
  } catch (error) {
    yield put({type: REQUEST_ERROR, error: error})
    return false
  } finally {
    yield put({type: SENDING_REQUEST, sending: false})
  }
}

export function * loginSaga () {
  while(true) {
    let request = yield take(LOGIN_REQUEST)
    let {email, password} = request.data

    yield put({type: SENDING_REQUEST, sending: true})
    let success = yield call(login, {email, password})

    if (success) {
      yield put({type: SET_AUTH, newAuthState: true})
      yield put({type: CHANGE_FORM, newFormState: {email: '', password: ''}})
      browserHistory.push('/dash')
    }
  }
}

export function * logoutSaga () {
  while(true) {
    yield take(LOGOUT)
    localStorage.removeItem('access_token')
    yield put({type: SET_AUTH, newAuthState: false})
    yield put({type: RESET_TRIPS})
    browserHistory.push('/')
  }
}

export function * fetchTripsSaga() {
  while(true) {
    yield take(FETCH_TRIPS)

    let response
    try {
      response = yield call(trips.fetchTrips)
    } catch (error) {
      yield put({type: FETCH_TRIPS_ERROR, error})
    }
    
    if (response) {
      yield put({type: FETCH_TRIPS_SUCCESS, trips: response})
    }
  }
}

export function * newTripSaga() {
  while(true) {
    let request = yield take(NEW_TRIP)
    
    let response
    try {
      response = yield call(trips.newTrip, request)
    } catch (error) {
      yield put({type: NEW_TRIP_ERROR, error})
      continue
    } 
    
    if (response) {
      yield put({type: NEW_TRIP_SUCCESS, trip: response})
      browserHistory.push('/dash')
    }
  }
}

export function * deleteTripSaga() {
  while(true) {
    let request = yield take(DELETE_TRIP)
    let {id} = request

    let response = yield call(trips.deleteTrip, id)

    if (response) {
      yield put({type: FETCH_TRIPS})
    }
  }
}

export function * fetchTripSaga () {
  while(true) {
    let request = yield take(FETCH_TRIP)
    let {id} = request

    let response
    try {
      response = yield call(trips.fetchTrip, id)
    } catch (error) {
      yield put({type: FETCH_TRIP_ERROR, error})
      browserHistory.push('/dash')
      continue
    }

    if (response) {
      yield put({type: FETCH_TRIP_SUCCESS, trip: response})
    }
  }
}

export default function * root () {
  yield fork(loginSaga)
  yield fork(logoutSaga)
  yield fork(fetchTripsSaga)
  yield fork(newTripSaga)
  yield fork(deleteTripSaga)
  yield fork(fetchTripSaga)
}