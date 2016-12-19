import React, {Component} from 'react'
import {connect} from 'react-redux'

import {loginRequest, changeForm} from '../actions'
import ErrorMessage from './ErrorMessage'

class Login extends Component {
  constructor (props) {
    super(props)

    this._onSubmit = this._onSubmit.bind(this)
    this._changeEmail = this._changeEmail.bind(this)
    this._changePassword = this._changePassword.bind(this)
  }

  _onSubmit (e) {
    e.preventDefault()
    this.props.dispatch(loginRequest({
      email: this.props.data.auth.formState.email,
      password: this.props.data.auth.formState.password
    }))
  }

  _changeEmail (e) {
    this.props.dispatch(changeForm({
      ...this.props.data.auth.formState, email: e.target.value
    }))
  }

  _changePassword (e) {
    this.props.dispatch(changeForm({
      ...this.props.data.auth.formState, password: e.target.value
    }))
  }

  render () {
    
    let {formState, error} = this.props.data.auth

    return (
      <div className='form-page__wrapper'>
        <div className='form-page__form-wrapper'>
          <div className='form-page__form-header'>
            <h2 className='form-page__form-heading'>Welcome back to Tripr</h2>
            <p className='form-page__form-subheading'>Log back in to keep up with your upcoming trips!</p>
          </div>

          <form className='form' onSubmit={this._onSubmit}> 
            {error ? <ErrorMessage error={error} /> : null}
            <div className='form__field-wrapper'>
              <input
                className='form__field-input'
                type='text'
                id='email'
                value={formState.email}
                onChange={this._changeEmail}
                placeholder='email@example.com' />
                <label className="form__field-label" htmlFor='email'>
                  Email
                </label>
            </div>

            <div className='form__field-wrapper'>
              <input
                className='form__field-input'
                type='password'
                id='password'
                onChange={this._changePassword}
                value={formState.password}
                placeholder='password' />
                <label className='form__field-label' htmlFor='password'>
                  Password
                </label>
            </div>

            <div className="form__actions-wrapper">
              <button className='btn form__actions-button' type='submit'>
                Login
              </button>
            </div>
          </form>          
        </div>
      </div>
    )
  }
}

function select (state) {
  return {
    data: state
  }
}

export default connect(select)(Login)