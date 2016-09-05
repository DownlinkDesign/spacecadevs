import React, { Component, PropTypes } from 'react'
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
  constructor(props) {
    super(props)

    switch (this.props.location.pathname) {
      case '/':
      this.props.setCurrentTab(0)
      break
      case '/signin':
      this.props.setCurrentTab(1)
      break
      case '/signup':
      this.props.setCurrentTab(2)
      break
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  checkDimensions(dimensions) {
    if (dimensions < 450) {
      this.props.toggleTabs(false)
    } else {
      if (this.props.showSideNav) {
        this.toggleSideNav()
      }
      switch (this.props.location.pathname) {
        case '/':
        this.props.setCurrentTab(0)
        break
        case '/signin':
        this.props.setCurrentTab(1)
        break
        case '/signup':
        this.props.setCurrentTab(2)
        break
      }
      this.props.toggleTabs(true)
    }
  }

  componentWillMount() {
    this.checkDimensions(window.innerWidth)
    window.addEventListener('resize', () => {
      this.checkDimensions(window.innerWidth)
    })
  }

  toggleSideNav() {
    this.props.toggleSideNav(!this.props.showSideNav)
  }

  switchComponent(link) {
    this.context.router.push(link)
    if (this.props.showSideNav) {
      this.toggleSideNav()
    }
  }

  handleTabChange(tabValue) {
    this.props.setCurrentTab(tabValue)
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
          onLeftIconButtonTouchTap={this.toggleSideNav.bind(this)}
          children={this.props.showTabs ? [
            <Tabs
              key={1}
              inkBarStyle={underLineStyle}
              value={this.props.currentTab}
              onChange={this.handleTabChange.bind(this)}
              >
              <Tab
                label='BLOGS'
                value={0}
                className='navTabs'
                onClick={() => this.switchComponent('/')}
                />
              <Tab
                label='SIGN IN'
                value={1}
                className='navTabs'
                onClick={() => this.switchComponent('/signin')}
                />
              <Tab
                label='SIGN UP'
                value={2}
                className='navTabs'
                onClick={() => this.switchComponent('/signup')}
                />
            </Tabs>
          ] : []}
          />

        <Drawer
          open={this.props.showSideNav}
          docked={false}
          onRequestChange={() => this.toggleSideNav()}
          containerClassName='sideNav'
          >
          <MenuItem
            className='sideNavItem'
            onClick={this.toggleSideNav.bind(this)}
            id='closeNavItem'>
            CLOSE MENU
          </MenuItem>
          <MenuItem
            className='sideNavItem'
            onClick={() => this.switchComponent('/')}>
            BLOGS
          </MenuItem>
          <MenuItem
            className='sideNavItem'
            onClick={() => this.switchComponent('/signin')}>
            SIGN IN
          </MenuItem>
          <MenuItem
            className='sideNavItem'
            onClick={() => this.switchComponent('/signup')}>
            SIGN UP
          </MenuItem>
        </Drawer>

        {this.props.children}
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    showTabs: state.material_ui.showTabs,
    showSideNav: state.material_ui.showSideNav,
    currentTab: state.material_ui.currentTab
  }
}

export default connect(mapStateToProps, actions)(Layout)
