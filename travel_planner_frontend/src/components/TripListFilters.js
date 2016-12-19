import React, {Component} from 'react'
import {connect} from 'react-redux'
import {tripsFilter} from '../actions/index'

class TripListFilters extends Component {
  constructor(props) {
    super(props)
    this._onChange = this._onChange.bind(this)
  }

  _onChange (e) {
    this.props.dispatch(tripsFilter(e.target.value))
  }

  render () {
    const { searchText } = this.props.data

    return (
      <div className="filters__wrapper">
        <div className="filters__right">
          <input 
            className="filters__search" 
            onChange={this._onChange} 
            value={searchText}
            placeholder='Search Trips...' />
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

export default connect(select)(TripListFilters)