import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import base64 from 'base-64'
import { first, values } from 'lodash'

import {
    CONTACTS_CHANGE_EMAIL
  , ADD_CONTACT_IS_RUNNING
  , ADD_CONTACT_ERROR
  , ADD_CONTACT_SUCCESS
  , GET_ALL_CONTACTS
} from  './types'

export const contactsChangeEmail = text => ({
    type: CONTACTS_CHANGE_EMAIL
  , payload: text
})

export const enableToAdd = () => (
  { type: ADD_CONTACT_SUCCESS, payload: false }
)

export const addContact = email => async dispatch => {
  try {
    dispatch( { type: ADD_CONTACT_IS_RUNNING, payload:  true  } )
    const email64 = base64.encode( email )
    const foundContact = await firebase.database().ref(`/contacts/${email64}`).once('value')
    if ( !foundContact.val() )
      return addContactError({message: 'Não existe esse user, meu parça!'}, dispatch)
    const userInformation = first( values( foundContact.val() ) )

    const { currentUser } = firebase.auth()
    const emailCurrentUser64 = base64.encode( currentUser.email )

    const createdContact = await firebase.database().ref(`/user_contacts/${emailCurrentUser64}`).push({email, name: userInformation.name })
    return addContactSuccess( dispatch )
  } catch ( err ) {
    addContactError( err, dispatch )
  }
}

const addContactSuccess = (dispatch) => {
  dispatch ({ type: ADD_CONTACT_SUCCESS, payload: true })
}

const addContactError= (err, dispatch) => {
  dispatch ({ type: ADD_CONTACT_ERROR, payload: err.message });
}

export const getAllContacts = () => {
  const { currentUser } = firebase.auth()
  return ( dispatch ) => {
    const loggedUserEmail64 = base64.encode(currentUser.email)
    firebase.database().ref(`/user_contacts/${loggedUserEmail64}`)
    .on('value', snapshot => {
      dispatch( { type: GET_ALL_CONTACTS, payload: snapshot.val() } )
    })
  }
}
