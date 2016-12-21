import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteTripRequest, fetchTrip, resetActiveTrip} from '../actions/index'
import moment from 'moment'
import Spinner from 'react-spinkit'
import {Link} from 'react-router'

class TripList extends Component {

  componentDidMount () {
    this.props.dispatch(fetchTrip(this.props.params.tripId))
  }

  componentWillUnmount () {
    this.props.dispatch(resetActiveTrip())
  }

  dateFormat(date) {
    return moment(date).format('MMMM Do, YYYY')
  }

  tripLength(trip) {
    let start = moment(trip.start_date)
    let end = moment(trip.end_date)
    return `${end.diff(start, 'days')} days`
  }

  _delete (id) {
    this.props.dispatch(deleteTripRequest(id))
  }

  render() {
    let trip = this.props.data.trip
    let {loading} = this.props.data

    if (loading) {
      return (
        <div className='form-page__wrapper'>
          <Spinner spinnerName='three-bounce' />
        </div>
      )
    } else if (!trip) {
      return (<span />)
    }

    return (
      <div>
        <div className="trip-header__wrapper">
          <div className="max-768">
            <h1>My {this.tripLength(trip)} trip</h1>
          </div>
        </div>
        <div className="max-768 panel">
          
          <table className="table">
            <tbody>
              <tr>
                <th>Destination</th>
                <td>{trip.destination}</td>
              </tr>
              <tr>
                <th>Start Date</th>
                <td>{this.dateFormat(trip.start_date)}</td>
              </tr>
              <tr>
                <th>End Date</th>
                <td>{this.dateFormat(trip.end_date)}</td>
              </tr>
              { !!trip.comment &&
                <tr>
                  <th>Comment</th>
                  <td>{trip.comment}</td>
                </tr>
              }
            </tbody>
          </table>
          <div className="panel-actions">
            <Link to={`/trip/${trip.id}/edit`} className="btn">Edit</Link>&nbsp;
            <a href="#" className="btn" onClick={this._delete.bind(this, trip.id)}>Delete</a>
          </div>
        </div>

      </div>
    )
  }
}

function select (state) {
  return {
    data: state.trips.activeTrip
  }
}

export default connect(select)(TripList)
