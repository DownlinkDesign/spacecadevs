import React, { Component } from 'react'
import { connect } from 'react-redux'

class Layout extends Component {

  render() {
    return (
      <div>
        <h1>Layout</h1>
        {this.props.children}
      </div>
    )
  }
}

export default connect()(Layout)
