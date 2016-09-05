import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import materialUIReducer from './materialUIReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  form: formReducer,
  material_ui: materialUIReducer,
  user: userReducer
})

export default rootReducer
