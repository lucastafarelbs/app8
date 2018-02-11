const INITIAL_STATE = {
    name: ''
  , email: ''
  , password: ''
  , registerError: ''
  , registerIsRunning: false
  , authenticationError: ''
  , authenticationIsRunning: false
}

import {
    CHANGE_NAME
  , CHANGE_EMAIL
  , CHANGE_PASSWORD
  , AUTHENTICATION_ERROR
  , AUTHENTICATION_SUCCESS
  , REGISTER_ERROR
  , REGISTER_SUCCESS
  , AUTHENTICATION_IS_RUNNING
  , REGISTER_IS_RUNNING
} from  '../actions/types'

export default ( state = INITIAL_STATE, action ) => {
  const types = {}
  types[ CHANGE_NAME ] = ({ ...state, name: action.payload })
  types[ CHANGE_EMAIL ] = ({ ...state, email: action.payload })
  types[ CHANGE_PASSWORD ] = ({ ...state, password: action.payload })
  types[ REGISTER_SUCCESS ] = ({ ...state, registerError: '', name: '', password:'', registerIsRunning: false })
  types[ REGISTER_ERROR ] = ({ ...state, registerError: action.payload, registerIsRunning: false })
  types[ REGISTER_IS_RUNNING ] = ({...state, registerIsRunning: action.payload })
  types[ AUTHENTICATION_IS_RUNNING ] = ({...state, authenticationIsRunning: action.payload })
  types[ AUTHENTICATION_SUCCESS ] = ({ ...state, ...INITIAL_STATE })
  types[ AUTHENTICATION_ERROR ] = ({ ...state, authenticationError: action.payload, authenticationIsRunning: false })
  return types[ action.type ] || state
}
