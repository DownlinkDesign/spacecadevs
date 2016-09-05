import {
  TOGGLE_TABS,
  TOGGLE_SIDE_NAV,
  SET_CURRENT_TAB,
  TOGGLE_SIGN_IN_DIALOG,
  TOGGLE_SIGN_UP_DIALOG
} from '../actions/types'

const initialState = {
  showTabs: true,
  showSideNav: false,
  currentTab: 0,
  showSignInDialog: false,
  showSignUpDialog: false,
  signUpDialogValue: '',
  signInDialogValue: ''
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
    case TOGGLE_SIGN_IN_DIALOG:
    return {
      ...state,
      showSignInDialog: action.payload.bool,
      signInDialogValue: action.payload.dialogValue
    }
    break
    case TOGGLE_SIGN_UP_DIALOG:
    return {
      ...state,
      showSignUpDialog: action.payload.bool,
      signUpDialogValue: action.payload.dialogValue
    }
    break
  }
  return { ...state }
}
