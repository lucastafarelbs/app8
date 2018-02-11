const INITIAL_STATE = {
    chatMessage: ''
  , chatting: []
  , chattingList: []
}

import {
    CHANGE_CHAT_MESSAGE
  , SEND_CHAT_MESSAGE
  , SEND_CHAT_MESSAGE_SUCCESS
  , LOAD_CHATTING
  , LOAD_CHATTING_LIST
} from '../actions/types.js'

export default ( state = INITIAL_STATE, action ) => {
  const types = {}
  types[ CHANGE_CHAT_MESSAGE ] = () => ( { ...state, chatMessage: action.payload } )
  types[ SEND_CHAT_MESSAGE ] = () => ( { ...state } )
  types[ SEND_CHAT_MESSAGE_SUCCESS ] = () => ( { ...state, chatMessage: '' } )
  types[ LOAD_CHATTING ] = () => ( { ...state, chatting: action.payload } )
  types[ LOAD_CHATTING_LIST ] = () => ( { ...state, chattingList: action.payload } )
  return types[ action.type ] ? types[ action.type ] () :  state
}
