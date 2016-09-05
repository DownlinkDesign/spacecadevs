import React, { Component } from 'react'
import { connect } from 'react-redux'

class SignIn extends Component {

  render() {
    return (
      <div>
        <h1>SignIn</h1>
      </div>
    )
  }
}

export default connect()(SignIn)
