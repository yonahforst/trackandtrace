import { combineReducers } from 'redux'
import beacon from './beacon'
import health from './health'
import trips from './trips'
import permissions from './permissions'
import user from './user'

export default combineReducers({
  // beacon,
  health,
  trips,
  permissions,
  user,
})