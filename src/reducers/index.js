import { combineReducers } from 'redux'
import AuthenticationReducers from './authentication-reducers'
import ContactsReducers from './contacts-reducers'
import ChattingReducers from './chatting-reducers'

export default combineReducers({
    AuthenticationReducers
  , ContactsReducers
  , ChattingReducers
})
