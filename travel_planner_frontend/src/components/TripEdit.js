import React, {Component} from 'react'
import {connect} from 'react-redux'
import Spinner from 'react-spinkit'
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import ErrorMessage from './ErrorMessage'
import {editTripFetch, editTrip, editTripChangeForm} from '../actions/index'
import Textarea from 'react-textarea-autosize';
import Geosuggest from 'react-geosuggest';
import moment from 'moment';

class TripEdit extends Component {
  constructor (props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
    this._onDestinationChange = this._onDestinationChange.bind(this)
    this._onSuggestSelect = this._onSuggestSelect.bind(this)
    this._onCommentChange = this._onCommentChange.bind(this)
    this._onDatesChange = this._onDatesChange.bind(this);
    this._onFocusChange = this._onFocusChange.bind(this);
    this.state = {
      focusedInput: null,
    }
  }

  _onSubmit (e) {
    e.preventDefault()
    this.props.dispatch(editTrip(this.props.data.trip.id, {
      ...this.props.data.trip,
    }))
  }

  _onDestinationChange (destination) {
    this.props.dispatch(editTripChangeForm({
      ...this.props.data.trip, destination
    }))
  }

  _onSuggestSelect (suggest) {
    this.props.dispatch(editTripChangeForm({
      ...this.props.data.trip, destination: suggest.label
    }))
  }

  _onCommentChange (e) {
    this.props.dispatch(editTripChangeForm({
      ...this.props.data.trip, comment: e.target.value
    }))
  }

  _onDatesChange({ startDate, endDate }) {
    this.props.dispatch(editTripChangeForm({
      ...this.props.data.trip, 
      start_date: startDate, 
      end_date: endDate
    }))
  }

  _onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  componentWillMount () {
    this.props.dispatch(editTripFetch(this.props.params.tripId))
  }

  render() {
    let {fetching, loading, error, trip} = this.props.data

    if (fetching) {
      return (
        <div className='form-page__wrapper'>
          <Spinner spinnerName='three-bounce' />
        </div>
      )
    } else if (!trip) {
      return (<span />)
    } 

    let {start_date, end_date, destination, comment} = this.props.data.trip
    start_date = moment(start_date)
    end_date = moment(end_date)
    const {focusedInput} = this.state

    return (
      <div className="form-page__wrapper">
        <div className="form-page__form-wrapper">
          <div className='form-page__form-header'>
            <h2 className='form-page__form-heading'>Edit your trip</h2>
          </div>
          <form className='form' onSubmit={this._onSubmit}>
            {error ? <ErrorMessage error={error} /> : null}
            <div className='form__field-wrapper'>
              <Geosuggest 
                id='destination' 
                value={destination}
                initialValue={destination}
                onChange={this._onDestinationChange}
                onSuggestSelect={this._onSuggestSelect}
                placeholder='' />
              <label className="form__field-label" htmlFor='destination'>
                Destination
              </label>
            </div>

            <DateRangePicker
              {...this.props}
              onDatesChange={this._onDatesChange}
              onFocusChange={this._onFocusChange}
              focusedInput={focusedInput}
              startDate={start_date}
              endDate={end_date}
            />

            <div className='form__field-wrapper'>
              <Textarea 
                id='comments' 
                className="form__field-input" 
                onChange={this._onCommentChange}
                value={comment}
                />
              <label className="form__field-label" htmlFor='comments'>
                Comments
              </label>
            </div>

            <div className="form__actions-wrapper">
              <button className='btn form__actions-button' type='submit' disabled={loading}>
                {loading ? 
                   <Spinner spinnerName='three-bounce' noFadeIn /> 
                  : 'Update Trip' }
              </button>
            </div>
            
          </form>
        </div>
      </div>
    )
  }

}

function select (state) {
  return {
    data: state.trips.editTrip
  }
}

export default connect(select)(TripEdit)