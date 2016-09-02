import React, { Component } from 'react'
import { connect } from 'react-redux'

class Splash extends Component {

  render() {
    return (
      <div>
        <h1>Splash</h1>
      </div>
    )
  }
}

export default connect()(Splash)
