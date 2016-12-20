import React, {Component} from 'react'
import {Link} from 'react-router'

class Home extends Component {
  render() {
    return (
      <div className="flex">
        <section id="intro">
          <h1>Track your travel</h1>
          <p>Never lose track of the places you go.</p>
          <Link to='/register' className='btn'>Sign up today</Link>
        </section>
      </div>
    )
  }
}

export default Home