import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {fetchTrips} from '../actions/index'
import {Link} from 'react-router'
import Spinner from 'react-spinkit'
import TripListFilters from './TripListFilters'
import GMap from './common/GMap'

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

  dateFormat(date) {
    return moment(date).format('MMMM Do, YYYY')
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
          <Spinner spinnerName='three-bounce' />
        </div>
      )
    }

    return (
      <div className="wrap">
        <div className="trip-page__wrapper">
          <TripListFilters />
          <div className="trip-page__list-wrapper">

            <article className="trip-item__wrapper">
              <Link to='/trip/new' className="trip-item">
                {this.props.me && this.props.me.role === 'admin' &&
                  <div className="trip-item__header">
                    &nbsp;
                  </div>
                }
                <div className="trip-item__title trip-item__new">
                  My next vacation
                </div>

                <div className="trip-item__info">
                  <div className='trip-item__time-until'>Click me to add a new trip</div>
                </div>
                
              </Link>
            </article>

            {this.filteredTrips().map(trip =>
              <article className="trip-item__wrapper" key={trip.id}>
                <Link to={'/trip/' + trip.id} className="trip-item">
                  {this.props.me && this.props.me.role === 'admin' &&
                    <div className="trip-item__header">
                      {trip.user_email}
                    </div>
                  }
                  <div className="trip-item__title">
                    <span className="trip-item__title-text">
                      {trip.destination}
                    </span>
                    { trip.longitude && trip.latitude ? 
                      <GMap
                        containerElement={ <div className="trip-item__map-container" /> }
                        mapElement={ <div className='trip-item__map'/> }
                        defaultCenter={{lat: trip.latitude, lng: trip.longitude}}
                        markers={[{position: {lat: trip.latitude, lng: trip.longitude}, key: trip.destination}]} />
                      : ''
                    }
                  </div>

                  <div className="trip-item__info">
                    <div className='trip-item__time-until'>{this.timeUntil(trip.start_date)}</div>
                    <span className='trip-item__start-date'>{this.dateFormat(trip.start_date)}</span>
                  </div>
                  
                </Link>
              </article>
            )}
          </div>
        </div>
      </div>
    )
  }
}

function select (state) {
  return {
    data: state.trips.tripsList,
    me: state.auth.user
  }
}

export default connect(select)(TripList)