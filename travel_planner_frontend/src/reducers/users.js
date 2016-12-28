import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  RESET_USERS,

  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,

  EDIT_USER_CHANGE_FORM,
  EDIT_USER_FETCH,
  EDIT_USER_FETCH_SUCCESS,
  EDIT_USER_FETCH_ERROR,
  RESET_EDIT_USER,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
} from '../actions/constants'

let initialState = {
  usersList: {users: [], error: null, loading: false},
  deleteUser: {loading: false, error: null},
  editUser: {user: {password: ''}, loading: false, error: null, fetching: false}
}

function users(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {...state, usersList: {...state.usersList, loading: true}}
    case FETCH_USERS_SUCCESS:
      return {...state, usersList: {users: action.users, error: null, loading: false}}
    case FETCH_USERS_ERROR:
      return {...state, usersList: {users: [], error: action.error, loading: false}}
    case RESET_USERS:
      return {...state, usersList: {users: [], error: null, loading: false}}

    case DELETE_USER:
      return {...state, deleteUser: {loading: true, error: null}}
    case DELETE_USER_SUCCESS:
      return {...state, deleteUser: {loading: false, error: null}}
    case DELETE_USER_ERROR:
      return {...state, deleteUser: {loading: false, error: action.error}}

    case EDIT_USER_CHANGE_FORM:
      return {...state, editUser: {...state.editUser, user: action.newFormState}}
    case EDIT_USER_FETCH:
      return {...state, editUser: {...state.editUser, fetching: true}}
    case EDIT_USER_FETCH_SUCCESS:
      return {...state, editUser: {user: action.user, error: null, fetching: false}}
    case EDIT_USER_FETCH_ERROR:
      return {...state, editUser: {user: {password: ''}, error: action.error, fetching: false}}
    case EDIT_USER:
      return {...state, editUser: {...state.editUser, loading: true, error: null}}
    case EDIT_USER_ERROR:
      return {...state, editUser: {...state.editUser, loading: false, error: action.error}}
    case EDIT_USER_SUCCESS:
      return {...state, editUser: {user: {password: ''}, loading: false, error: null}}
    case RESET_EDIT_USER:
      return {...state, editUser: {user: {password: ''}, loading: false, error: null}}

    default:
      return state
  }
}

export default users