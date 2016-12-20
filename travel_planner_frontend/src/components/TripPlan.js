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
        <h1>Your 1 month trip plan</h1>
        <a href='#' className='btn print-btn' onClick={this.print.bind(this)}>Print your trip plan</a>
        {trips.map(trip =>
          <div>
          <ul key={trip.id} style={{width: '100%'}}>
            <h2>{trip.destination}</h2>
            <li><b>Starts:</b> {this.timeUntil(trip.start_date)} on {this.dateFormat(trip.start_date)}</li>
            <li><b>Ends:</b> on {this.dateFormat(trip.end_date)}</li>
            <p>{trip.comment}</p>
          </ul>
          <hr/>
          </div>
        )}
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
