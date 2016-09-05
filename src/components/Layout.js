import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import {
  AppBar,
  Tabs,
  Tab,
  Drawer,
  MenuItem
} from 'material-ui'

class Layout extends Component {

  checkDimensions(dimensions) {
    if (dimensions < 450) {
      this.props.toggleTabs(false)
    } else {
      this.props.toggleTabs(true)
    }
  }

  componentWillMount() {
    this.checkDimensions(window.innerWidth)
    window.addEventListener('resize', () => {
      this.checkDimensions(window.innerWidth)
    })
  }

  render() {
    const underLineStyle = {
      backgroundColor: 'rgb(32,50,67)'
    }

    return (
      <div>
        <AppBar
          className='navBar'
          title={this.props.showTabs ? <img src='images/SpaceCadevsWithText.png' className='navLogo'/> : null}
          showMenuIconButton={!this.props.showTabs}
          iconElementRight={!this.props.showTabs ? <img src='images/SpaceCadevsWithText.png' className='navLogo'/> : null}
          children={this.props.showTabs ? [
            <Tabs
              key={1}
              inkBarStyle={underLineStyle}
              value={this.props.currentTab}
              >
              <Tab
                label='BLOGS'
                value={0}
                className='navTabs'
                />
              <Tab
                label='SIGN IN'
                value={1}
                className='navTabs'
                />
              <Tab
                label='SIGN UP'
                value={2}
                className='navTabs'
                />
            </Tabs>
          ] : []}
          />
        {this.props.children}
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    showTabs: state.material_ui.showTabs
  }
}

export default connect(mapStateToProps, actions)(Layout)
