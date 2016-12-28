import React, {Component} from 'react'
import {connect} from 'react-redux'
import Nav from './common/Nav'
import {fetchMe} from '../actions/index'

class App extends Component {
  componentWillMount() {
    this.props.dispatch(fetchMe())
  }

  render() {
    return (
      <div className="height-100">
        <Nav isAuthenticated={this.props.data.auth.isAuthenticated}
             currentlySending={this.props.data.currentlySending}
             history={this.props.history}
             dispatch={this.props.dispatch}
             location={this.props.location} />
        {this.props.children}
      </div>
    )
  }
}

function select (state) {
  return {
    data: state
  }
}

export default connect(select)(App)