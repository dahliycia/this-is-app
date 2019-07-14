import { combineReducers } from 'redux'
import photosReducer from './Photos/duck'

export default combineReducers({
  ...photosReducer
})