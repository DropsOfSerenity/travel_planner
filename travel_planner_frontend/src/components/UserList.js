import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers, deleteUser} from '../actions/index'
import Spinner from 'react-spinkit'
import { browserHistory } from 'react-router';
import {Link} from 'react-router'

class UserList extends Component {

  componentWillMount () {
    this.props.dispatch(fetchUsers())
  }

  componentWillReceiveProps (nextProps) {
    // FIXME: slight of hand authorization here, not a big deal.
    if (!nextProps.auth.loading && nextProps.auth.user && nextProps.auth.user.role === 'user') {
      browserHistory.push('/dash')
    }
  }

  _delete (id) {
    this.props.dispatch(deleteUser(id))
  }

  render () {
    const { loading } = this.props.data
    if (loading) {
      return (
        <div className='form-page__wrapper'>
          <Spinner spinnerName='three-bounce' />
        </div>
      )
    }

    return (
      <div className="wrap">
        <table className="table">
          <tbody>
            {this.props.data.users.map(user =>
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>
                  <Link to={'/users/' + user.id + '/edit'}>Edit</Link>
                </td>
                <td>
                  <a href='#' onClick={this._delete.bind(this, user.id)}>Delete</a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

function select (state) {
  return {
    data: state.users.usersList,
    auth: state.auth
  }
}

export default connect(select)(UserList)