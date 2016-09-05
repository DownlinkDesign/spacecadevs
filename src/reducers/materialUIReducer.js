import {
  TOGGLE_TABS
} from '../actions/types'

const initialState = {
  showTabs: true
}

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_TABS:
    return { ...state, showTabs: action.payload }
    break
  }
  return { ...state }
}
