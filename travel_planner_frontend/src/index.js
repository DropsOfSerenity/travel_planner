import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas/index'
import createLogger from 'redux-logger';
import { Router, Route, browserHistory } from 'react-router'

import './index.css';

import App from './components/App';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import TripList from './components/TripList';
import NewTrip from './components/NewTrip';
import TripDetail from './components/TripDetail';
import TripEdit from './components/TripEdit';
import TripPlan from './components/TripPlan';

import tripApp from './reducers'

const logger = createLogger();
let sagaMiddleware = createSagaMiddleware()
let store = createStore(tripApp, applyMiddleware(logger, sagaMiddleware))
sagaMiddleware.run(sagas)

function ensureLoggedIn (nextState, replace) {
  let {isAuthenticated} = store.getState().auth

  if (!isAuthenticated) {
    replace('/login')
  }
}

function ensureLoggedOut (nextState, replace) {
  let {isAuthenticated} = store.getState().auth

  if (isAuthenticated) {
    replace('/dash')
  }
}

const router = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route onEnter={ensureLoggedIn}>
          <Route path="/dash" component={TripList}></Route>
          <Route path="/trip/new" component={NewTrip}></Route>
          <Route path="/trip/:tripId" component={TripDetail}></Route>
          <Route path="/trip/:tripId/edit" component={TripEdit}></Route>
          <Route path="/trip_plan" component={TripPlan}></Route>
        </Route>
        <Route onEnter={ensureLoggedOut}>
          <Route path="/" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
        </Route>
      </Route>
    </Router>
  </Provider>
)
ReactDOM.render(router, document.getElementById('root'));
