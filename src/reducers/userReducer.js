import { SIGN_IN, SIGN_UP, SIGN_OUT } from '../actions/types'

const initialState = {
  signedIn: false,
  user: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
    if (
      window.localStorage['user_id'] &&
      window.localStorage['username'] &&
      window.localStorage['token']
    ) {
      return { signedIn: true, user: action.payload.data.user }
    }
    break
    case SIGN_UP:
    if (
      window.localStorage['user_id'] &&
      window.localStorage['username'] &&
      window.localStorage['token']
    ) {
      return { signedIn: true, user: action.payload.data.user }
    }
    break
    case SIGN_OUT:
    if (
      !window.localStorage['user_id'] &&
      !window.localStorage['username'] &&
      !window.localStorage['token']
    ) {
      return { signedIn: false, user: {} }
    }
    break
  }
  return { ...state }
}
