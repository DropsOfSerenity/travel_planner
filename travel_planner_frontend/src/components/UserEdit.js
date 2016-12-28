import React, {Component} from 'react'
import {connect} from 'react-redux'
import Spinner from 'react-spinkit'
import {editUserFetch, editUserChangeForm, editUser} from '../actions/index'
import {Link} from 'react-router'
import ErrorMessage from './common/ErrorMessage'
import Select from 'react-select';

var options = [
    { value: 'user', label: 'Normal User' },
    { value: 'manager', label: 'User Manager' },
    { value: 'admin', label: 'Administrator' },
];

class UserEdit extends Component {

  constructor(params) {
    super(params)

    this._onSubmit = this._onSubmit.bind(this)
    this._onEmailChange = this._onEmailChange.bind(this)
    this._onPasswordChange = this._onPasswordChange.bind(this)
    this._onRoleChange = this._onRoleChange.bind(this)
  }

  componentWillMount () {
    this.props.dispatch(editUserFetch(this.props.params.userId))
  }

  _onEmailChange (e) {
    this.props.dispatch(editUserChangeForm({
      ...this.props.data.user, email: e.target.value
    }))
  }

  _onPasswordChange (e) {
    this.props.dispatch(editUserChangeForm({
      ...this.props.data.user, password: e.target.value
    }))
  }

  _onRoleChange (e) {
    if (!e) return
    this.props.dispatch(editUserChangeForm({
      ...this.props.data.user, role: e.value
    }))
  }

  _onSubmit (e) {
    e.preventDefault()
    this.props.dispatch(editUser(this.props.data.user.id, {
      ...this.props.data.user,
    }))
  }

  render () {
    const {fetching, loading, error, user} = this.props.data

    if (fetching) {
      return (
        <div className='form-page__wrapper'>
          <Spinner spinnerName='three-bounce' />
        </div>
      )
    } else if (!user) {
      return (<span />)
    } 

    return (
      <div className="max-768">
        <div className="panel-padded">
          <div className="panel-header">
            <h3>Edit User</h3>
          </div>

          <form onSubmit={this._onSubmit}>
            {error ? <ErrorMessage error={error} /> : null}
            <div className="panel-body">

              {this.props.me && this.props.me.role === 'admin' &&
                <div className="field-wrapper">
                  <label htmlFor="role">Permissions</label>
                  <Select
                    id="role"
                    name="role"
                    value={user.role}
                    options={options}
                    onChange={this._onRoleChange}
                  />
                </div>
              }

              <div className="field-wrapper">
                <label htmlFor="email">Email</label>
                <input 
                  id="email" 
                  className="form-control" 
                  type="email" 
                  onChange={this._onEmailChange} 
                  value={user.email} 
                  placeholder="email" />
              </div>
              <div className="field-wrapper">
                <label htmlFor="password">Password</label>
                <input 
                  id="password"
                  onChange={this._onPasswordChange} 
                  className="form-control" 
                  type="password" 
                  value={user.password} 
                  placeholder="new password" />
                <p className="help-text"><b>Note:</b> Leave password blank to keep password the same.</p>
              </div>
            </div>

            <div className="panel-actions">
              <button className='btn form__actions-button' type='submit' disabled={loading}>
                {loading ? 
                   <Spinner spinnerName='three-bounce' noFadeIn /> 
                  : 'Update User' }
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
    data: state.users.editUser,
    me: state.auth.user,
  }
}

export default connect(select)(UserEdit)