import {
  TOGGLE_TABS,
  TOGGLE_SIDE_NAV,
  SET_CURRENT_TAB
} from '../actions/types'

const initialState = {
  showTabs: true,
  showSideNav: false,
  currentTab: 0
}

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_TABS:
    return { ...state, showTabs: action.payload }
    break
    case TOGGLE_SIDE_NAV:
    return { ...state, showSideNav: action.payload }
    break
    case SET_CURRENT_TAB:
    return { ...state, currentTab: action.payload }
    break
  }
  return { ...state }
}
