import React, { Component } from 'react'
import { connect } from 'react-redux'

class SignUp extends Component {

  render() {
    return (
      <div>
        <h1>SignUp</h1>
      </div>
    )
  }
}

export default connect()(SignUp)
