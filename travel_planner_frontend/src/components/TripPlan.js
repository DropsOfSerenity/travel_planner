import React, {Component} from 'react'
import {connect} from 'react-redux'
import Spinner from 'react-spinkit'
import {fetchTripPlan} from '../actions'
import moment from 'moment'

class TripPlan extends Component {

  componentWillMount () {
    this.props.dispatch(fetchTripPlan())
  }

  dateFormat(date) {
    return moment(date).format('MMMM Do, YYYY')
  }

  timeUntil(date) {
    let today = moment().startOf('day')
    let startDate = moment(date)
    let diff = startDate.diff(today, 'days')
    if (diff > 0) {
      return `in ${startDate.diff(today, 'days')} day${diff === 1 ? '' : 's'}`
    } else if (diff === 0) {
      return 'today'
    } else {
      return 'in the past'
    }
  }

  tripLength(trip) {
    let start = moment(trip.start_date)
    let end = moment(trip.end_date)
    return `${end.diff(start, 'days')} day trip`
  }

  print (e) {
    e.preventDefault()
    window.print()
  }

  render() {
    let {loading, trips} = this.props.data

    if (loading) {
      return (
        <div className='form-page__wrapper'>
          <Spinner spinnerName='three-bounce' />
        </div>
      )
    } else if (!trips) {
      return (<span />)
    }

    return (
      <div>
        <div className="trip-header__wrapper">
          <div className="max-768">
            <h1>Your 1 month trip plan</h1>
          </div>
        </div>
        <div className='max-768 trip-plan__wrapper'>
          <a href='#' className='btn print-btn' onClick={this.print.bind(this)}>Print my trip plan</a>
          
          {trips.map(trip =>
            <div key={trip.id} className='trip-plan__trip'>
              <div className="trip-plan__duration">
                <span>{this.tripLength(trip)}</span>
              </div>
              <div className="trip-plan__trip-destination">{trip.destination}</div>
              <div className="trip-plan__trip-leaving">
                Departing on {this.dateFormat(trip.start_date)}
              </div>
              { trip.comment ?
                <div className="trip-plan__trip-comments">
                  <span>{trip.comment}</span>
                </div>
                : ''
              }
              <div className="trip-plan__trip-returning">Returning on {this.dateFormat(trip.end_date)}</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

function select (state) {
  return {
    data: state.trips.tripPlan
  }
}

export default connect(select)(TripPlan)
