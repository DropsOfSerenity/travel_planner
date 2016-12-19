import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchTrip, resetActiveTrip} from '../actions/index'
import moment from 'moment'
import Spinner from 'react-spinkit'

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

  render() {
    let trip = this.props.data.trip
    let {loading} = this.props.data

    if (loading) {
      return (
        <div className='form-page__wrapper'>
          <Spinner spinnerName='three-bounce' noFadeIn />
        </div>
      )
    } else if (!trip) {
      return (<span />)
    } 

    return (
      <article className="trip-item" key={trip.id}>
        <p className="trip-item__day_badge">
          {this.dateFormat(trip.start_date)}
          <span className="trip-item__spacer">•</span>
          <span className="trip-item__days">{trip.start_date}</span>
        </p>
        <h2 className="trip-item__destination">Destination: {trip.destination}</h2>
        <p className="trip-item__comment">{trip.comment || 'No comments.'}</p>
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