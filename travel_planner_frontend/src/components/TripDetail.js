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
      <article>
        <h2>Destination: {trip.destination}</h2>
        <p>Trip Starts on {this.dateFormat(trip.start_date)}</p>
        <p>Trip Ends on {this.dateFormat(trip.end_date)}</p>
        <p>Trip Duration: {this.tripLength(trip)}</p>
        <p className="trip-item__comment">{trip.comment || 'No comments.'}</p>
        <Link to={`/trip/${trip.id}/edit`} >Edit</Link>
        <a href="#" onClick={this._delete.bind(this, trip.id)}>Delete</a>
      </article>
    )
  }
}

function select (state) {
  return {
    data: state.trips.activeTrip
  }
}

export default connect(select)(TripList)