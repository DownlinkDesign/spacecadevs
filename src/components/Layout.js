import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as actions from '../actions'
import { checkIfSignedIn } from '../helpers/checkIfSignedIn'
import { determineTab } from '../helpers/determineTab'
import { AppBar, Tabs, Tab, Drawer, MenuItem } from 'material-ui'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.props.setCurrentTab(determineTab(this.props.location.pathname))
  }

  static contextTypes = {
    router: PropTypes.object
  }

  checkDimensions(dimensions) {
    if (!this.props.signedIn && dimensions < 500) {
      this.props.toggleTabs(false)
    } else if(this.props.signedIn && dimensions < 700) {
      this.props.toggleTabs(false)
    } else {
      if (this.props.showSideNav) {
        this.toggleSideNav()
      }
      this.props.setCurrentTab(determineTab(this.props.location.pathname))
      this.props.toggleTabs(true)
    }
  }

  componentWillMount() {
    this.checkDimensions(window.innerWidth)
    window.addEventListener('resize', () => {
      this.checkDimensions(window.innerWidth)
    })
    browserHistory.listen((location) => {
      this.props.setCurrentTab(determineTab(location.pathname))
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

  signOut() {
    this.props.signOut()
    this.switchComponent('/')
    this.props.setCurrentTab(0)
  }

  render() {
    const underLineStyle = { backgroundColor: 'rgb(32,50,67)' }
    return (
      <div>
        <AppBar
          className='navBar'
          title={this.props.showTabs ? <img src='images/SpaceCadevsWithText.png' className='navLogo'/> : null}
          showMenuIconButton={!this.props.showTabs}
          iconElementRight={!this.props.showTabs ? <img src='images/SpaceCadevsWithText.png' className='navLogo'/> : null}
          onLeftIconButtonTouchTap={this.toggleSideNav.bind(this)}
          children={this.props.showTabs && !this.props.signedIn ? [
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
          ] : this.props.signedIn && this.props.showTabs ? [
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
                label='PROFILE'
                value={1}
                className='navTabs'
                onClick={() => this.switchComponent('/signin')}
                />
              <Tab
                label='ADD POST'
                value={2}
                className='navTabs'
                onClick={() => this.switchComponent('/signup')}
                />
              <Tab
                label='SIGN OUT'
                value={2}
                className='navTabs'
                onClick={() => this.signOut()}
                />
            </Tabs>
          ] : null}
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
    currentTab: state.material_ui.currentTab,
    signedIn: state.user.signedIn
  }
}

export default connect(mapStateToProps, actions)(Layout)
