import React, {Component} from 'react'
import {Link} from 'react-router'
import {logout} from '../../actions/index'
import {connect} from 'react-redux'

class Nav extends Component {
  constructor (props) {
    super(props)

    this._logout = this._logout.bind(this)
  }

  _logout () {
    this.props.dispatch(logout())
  }

  render () {
    let navButtons;
    if (this.props.isAuthenticated) {
      // logged in 
      navButtons = (
        <div>
          {this.props.data.user && this.props.data.user.role !== 'user' && 
            <Link to='/users' className='btn btn-nav btn-nav__text' activeClassName='btn-active'>Users</Link>
          }
          <Link to='/dash' className='btn btn-nav btn-nav__text' activeClassName='btn-active'>Trips</Link>
          <Link to='/trip_plan' className='btn btn-nav btn-nav__text' activeClassName='btn-active'>Trip Plan</Link>
          <span className='nav__user-email'>{this.props.data.user.email}</span>
          <a href="#" onClick={this._logout} className='btn btn-nav'>Logout</a>
        </div>
      )
    } else {
      // not logged in
      navButtons = (
        <div>
          <Link to='/register' className='btn btn-nav' activeClassName='btn-active'>Register</Link>
          <Link to='/login' className='btn btn-nav' activeClassName='btn-active'>Login</Link>
        </div>
      )
    }

    return (
      <div className='nav'>
        <div className='nav__wrapper'>
          <Link to='/' className='nav__logo-wrapper' onClick={this._clearError}>
            <h1 className='nav__logo'>Tripr</h1>
          </Link>
          {navButtons}
        </div>
      </div>
    )
  }
}

function select (state) {
  return {
    data: state.auth,
  }
}

export default connect(select)(Nav)