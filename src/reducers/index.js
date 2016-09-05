import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import materialUIReducer from './materialUIReducer'

const rootReducer = combineReducers({
  form: formReducer,
  material_ui: materialUIReducer
})

export default rootReducer
