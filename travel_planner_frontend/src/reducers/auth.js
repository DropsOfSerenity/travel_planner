import {
  CHANGE_FORM, SET_AUTH, SENDING_REQUEST, REQUEST_ERROR, CLEAR_ERROR,
  REGISTER, REGISTER_SUCCESS, REGISTER_ERROR, RESET_REGISTER, REGISTER_CHANGE_FORM,
  FETCH_ME_SUCCESS, FETCH_ME_ERROR, FETCH_ME
} from '../actions/constants'

let initialState = {
  isAuthenticated: localStorage.getItem('access_token') ? true : false,
  formState: {email: '', password: ''},
  register: {user: {email: '', password: ''}, error: null, loading: false},
  user: {}
};
function auth(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM:
      return {...state, formState: action.newFormState}
    case SET_AUTH:
      return {...state, isAuthenticated: action.newAuthState, user: action.user}
    case SENDING_REQUEST:
      return {...state, currentlySending: action.sending}
    case REQUEST_ERROR:
      return {...state, error: action.error}
    case CLEAR_ERROR:
      return {...state, error: ''}

    case FETCH_ME:
      return {...state, loading: true}
    case FETCH_ME_SUCCESS:
      return {...state, user: action.user, isAuthenticated: true, loading: false}
    case FETCH_ME_ERROR:
      return {...state, user: {}, isAuthenticated: false, loading: false}

    case REGISTER:
      return {...state, register: {...state.register, loading: true}}
    case REGISTER_SUCCESS:
      return {...state, register: {user: {email: '', password: ''}, error: null, loading: false}}
    case REGISTER_ERROR:
      return {...state, register: {...state.register, error: action.error, loading: false}}
    case RESET_REGISTER:
      return {...state, register: {user: {email: '', password: ''}, error: null, loading: false}}
    case REGISTER_CHANGE_FORM:
      return {...state, register: {...state.register, user: action.newFormState}}

    default:
      return state;
  }
}

export default auth