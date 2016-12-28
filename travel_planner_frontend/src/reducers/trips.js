import {
  FETCH_TRIPS,
  FETCH_TRIPS_SUCCESS,
  FETCH_TRIPS_ERROR,
  RESET_TRIPS,
  TRIPS_FILTER,

  FETCH_TRIP_PLAN,
  FETCH_TRIP_PLAN_SUCCESS,
  FETCH_TRIP_PLAN_ERROR,
  RESET_TRIP_PLAN,

  NEW_TRIP,
  NEW_TRIP_SUCCESS,
  NEW_TRIP_CHANGE_FORM,
  NEW_TRIP_ERROR,
  RESET_NEW_TRIP,

  FETCH_TRIP,
  FETCH_TRIP_SUCCESS,
  FETCH_TRIP_ERROR,
  RESET_ACTIVE_TRIP,

  EDIT_TRIP,
  EDIT_TRIP_SUCCESS,
  EDIT_TRIP_CHANGE_FORM,
  EDIT_TRIP_ERROR,
  RESET_EDIT_TRIP,
  EDIT_TRIP_FETCH,
  EDIT_TRIP_FETCH_SUCCESS,
  EDIT_TRIP_FETCH_ERROR,

  FETCH_ME_SUCCESS,
  FETCH_ME_ERROR
} from '../actions/constants'

let initialState = {
  tripsList: {trips: [], error: null, loading: false, searchText: ''},
  activeTrip: {trip: null, loading: false, error: null},
  newTrip: {trip: {destination: '', start_date: null, end_date: null, comment: ''}, error: null, loading: false},
  editTrip: {trip: null, loading: false, error: null},
  tripPlan: {trips: [], error: null, loading: false}
}

function trips(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRIP_PLAN:
      return {...state, tripPlan: {...state.tripPlan, loading: true}}
    case FETCH_TRIP_PLAN_SUCCESS:
      return {...state, tripPlan: {trips: action.trips, error: null, loading: false}}
    case FETCH_TRIP_PLAN_ERROR:
      return {...state, tripPlan: {trips: [], error: action.error, loading: false}}
    case RESET_TRIP_PLAN:
      return {...state, tripPlan: {trips: [], error: null, loading: false}}

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
    

    case EDIT_TRIP_FETCH:
      return { ...state, editTrip: {...state.editTrip, fetching: true}};
    case EDIT_TRIP_FETCH_SUCCESS:
       return { ...state, editTrip: {trip: action.trip, error: null, fetching: false}};
    case EDIT_TRIP_FETCH_ERROR:
       return {...state, editTrip: {trip: null, error: null, fetching: false}}
    case EDIT_TRIP:
      return {...state, editTrip: {...state.editTrip, loading: true}}
    case EDIT_TRIP_SUCCESS:
      return {...state, editTrip: {...state.editTrip, error: null, loading: false}}
    case EDIT_TRIP_ERROR:
      return {...state, editTrip: {...state.editTrip, error: action.error, loading: false}}
    case EDIT_TRIP_CHANGE_FORM:
      return {...state, editTrip: {...state.editTrip, trip: action.newFormState}}
    case RESET_EDIT_TRIP:
      return {...state, editTrip: {trip: null, error: null, loading: false}}
    
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

export default trips