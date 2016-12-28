import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas/index'
import createLogger from 'redux-logger';
import { Router, Route, browserHistory } from 'react-router'
import ReduxToastr from 'react-redux-toastr'

import './index.css';
import 'react-select/dist/react-select.css';
import 'react-dates/lib/css/_datepicker.css';

import App from './components/App';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import TripList from './components/TripList';
import NewTrip from './components/NewTrip';
import TripDetail from './components/TripDetail';
import TripEdit from './components/TripEdit';
import TripPlan from './components/TripPlan';
import UserList from './components/UserList';
import UserEdit from './components/UserEdit';

import tripApp from './reducers'
import {fetchMe} from './actions/index'

const logger = createLogger();
let sagaMiddleware = createSagaMiddleware()
let store = createStore(tripApp, applyMiddleware(logger, sagaMiddleware))
sagaMiddleware.run(sagas)

function ensureLoggedIn (nextState, replace) {
  let {isAuthenticated} = store.getState().auth

  console.log (isAuthenticated)
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
    <span>
      <Router history={browserHistory}>
        <Route component={App}>
          <Route onEnter={ensureLoggedIn}>
            <Route path="/dash" component={TripList}></Route>
            <Route path="/trip/new" component={NewTrip}></Route>
            <Route path="/trip/:tripId" component={TripDetail}></Route>
            <Route path="/trip/:tripId/edit" component={TripEdit}></Route>
            <Route path="/trip_plan" component={TripPlan}></Route>
            <Route path="/users" component={UserList}></Route>
            <Route path="/users/:userId/edit" component={UserEdit}></Route>
          </Route>
          <Route onEnter={ensureLoggedOut}>
            <Route path="/" component={Home}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
          </Route>
        </Route>
      </Router>

      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates={true}
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar/>
    </span>
  </Provider>
)
ReactDOM.render(router, document.getElementById('root'));
