import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {deleteTripRequest, fetchTrips} from '../actions/index'
import {Link} from 'react-router'
import Spinner from 'react-spinkit'
import TripListFilters from './TripListFilters'

class TripList extends Component {

  componentWillMount () {
    this.props.dispatch(fetchTrips())
  }

  timeUntil(date) {
    let today = moment().startOf('day')
    let startDate = moment(date)
    let diff = startDate.diff(today, 'days')
    if (diff > 0) {
      return `in ${startDate.diff(today, 'days')} day${diff === 1 ? '' : 's'}`
    } else if (diff === 0) {
      return 'today!'
    } else {
      return 'in the past'
    }
  }

  tripLength(trip) {
    let start = moment(trip.start_date)
    let end = moment(trip.end_date)
    return `${end.diff(start, 'days')} days`
  }

  dateFormat(date) {
    return moment(date).format('MMMM Do, YYYY')
  }

  _delete (id) {
    this.props.dispatch(deleteTripRequest(id))
  }

  filteredTrips () {
    const { searchText, trips } = this.props.data
    let filtered = trips
    if (searchText) {
      filtered = trips.filter((item) => {
        if (item.destination.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
            (item.comment && item.comment.toLowerCase().indexOf(searchText.toLowerCase()) !== -1))
          return true
        else
          return false
      })
    }
    return filtered
  }

  render() {
    const { loading } = this.props.data

    if (loading) {
      return (
        <div className='form-page__wrapper'>
          <Spinner spinnerName='three-bounce' noFadeIn />
        </div>
      )
    }

    return (
      <div className="trip-page__wrapper">
        <TripListFilters />
        <div className="trip-page__list-wrapper">
          {this.filteredTrips().map(trip =>
            <article className="trip-item" key={trip.id}>
              <Link to={'/trip/' + trip.id} className='trip-item__destination'>
                <h2>Destination: {trip.destination}</h2>
              </Link>
              <span className='trip-item__day_badge'>{this.dateFormat(trip.start_date)}</span>
              <span className="trip-item__spacer">&raquo;</span>
              <span className="trip-item__day_badge">{this.dateFormat(trip.end_date)}</span>
              <div className='trip-item__days'>{this.timeUntil(trip.start_date)}</div>
              <p className="trip-item__comment">{trip.comment || 'No comments.'}</p>
              <a href="#" onClick={this._delete.bind(this, trip.id)}>Delete</a>
            </article>
          )}
        </div>
      </div>
    )
  }
}

function select (state) {
  return {
    data: state.trips.tripsList,
  }
}

export default connect(select)(TripList)