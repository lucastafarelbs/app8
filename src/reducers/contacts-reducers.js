const INITIAL_STATE = {
    contactsEmail: ''
  , contactsIsAdded: false
  , addContactError: ''
  , addContactSuccess: ''
  , addContactIsRunning: false
  , contacts: []
}

import {
    ADD_CONTACT_ERROR
  , ADD_CONTACT_SUCCESS
  , ADD_CONTACT_IS_RUNNING
  , CONTACTS_CHANGE_EMAIL
  , GET_ALL_CONTACTS
} from  '../actions/types'

import { map } from 'lodash'

export default ( state = INITIAL_STATE, action ) => {
  const types = {}
  types[ CONTACTS_CHANGE_EMAIL ] = () => ({ ...state, contactsEmail: action.payload })
  types[ ADD_CONTACT_ERROR ] = () => ({ ...state, addContactError: action.payload, addContactIsRunning: false })
  types[ ADD_CONTACT_SUCCESS ] = () => ({ ...state, addContactError: '', addContactIsRunning: false, contactsIsAdded: action.payload, contactsEmail:'' })
  types[ ADD_CONTACT_IS_RUNNING ] = () => ({...state, addContactIsRunning: action.payload })
  types[ GET_ALL_CONTACTS ] = () => ({
        ...state
      , contacts: map(action.payload, ( val, uid ) =>  ({...val, uid }) )
  })
  return types[ action.type ] ? types[ action.type ]() : state
}
