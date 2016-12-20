import React, {Component} from 'react'
import {connect} from 'react-redux'

import {registerRequest, registerChangeForm, resetRegister} from '../actions'
import ErrorMessage from './common/ErrorMessage'
import {Link} from 'react-router'

class Register extends Component {
  constructor (props) {
    super(props)

    this._onSubmit = this._onSubmit.bind(this)
    this._changeEmail = this._changeEmail.bind(this)
    this._changePassword = this._changePassword.bind(this)
  }

  componentWillMount () {
    this.props.dispatch(resetRegister());
  }

  _onSubmit (e) {
    e.preventDefault()
    this.props.dispatch(registerRequest({
      email: this.props.data.user.email,
      password: this.props.data.user.password
    }))
  }

  _changeEmail (e) {
    this.props.dispatch(registerChangeForm({
      ...this.props.data.user, email: e.target.value
    }))
  }

  _changePassword (e) {
    this.props.dispatch(registerChangeForm({
      ...this.props.data.user, password: e.target.value
    }))
  }

  render () {
    
    let {user, error} = this.props.data

    return (
      <div className='form-page__wrapper'>
        <div className='form-page__form-wrapper'>
          <div className='form-page__form-header'>
            <h2 className='form-page__form-heading'>Welcome to Tripr</h2>
            <p className='form-page__form-subheading'>Sign up now and get started tracking your future vacations. For free!</p>
          </div>

          <form className='form' onSubmit={this._onSubmit}> 
            {error ? <ErrorMessage error={error} /> : null}
            <div className='form__field-wrapper'>
              <input
                className='form__field-input'
                type='text'
                id='email'
                value={user.email}
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
                value={user.password}
                placeholder='password' />
                <label className='form__field-label' htmlFor='password'>
                  Password
                </label>
            </div>

            <div className="form__actions-wrapper">
              <button className='btn form__actions-button' type='submit'>
                Sign me up!
              </button>
            </div>

            <div className="form__actions-extra">
              <p>
                Already have an account?
                &nbsp;<Link to='/login'>Log in</Link>
              </p>
            </div>
          </form>          
        </div>
      </div>
    )
  }
}

function select (state) {
  return {
    data: state.auth.register
  }
}

export default connect(select)(Register)