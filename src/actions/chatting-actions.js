import firebase from 'firebase'
import base64 from 'base-64'
import { Actions } from 'react-native-router-flux'
import { first, values, map } from 'lodash'

import {
    CHANGE_CHAT_MESSAGE
  , SEND_CHAT_MESSAGE
  , SEND_CHAT_MESSAGE_SUCCESS
  , LOAD_CHATTING
  , LOAD_CHATTING_LIST
} from './types'

export const changeChatMessage = text => ({
  type: CHANGE_CHAT_MESSAGE, payload: text
})

export const sendChatMessage = ( { chatMessage, contactName, contactEmail } ) => async dispatch => {
  try {
    const { currentUser } = await firebase.auth()
    const loggedUserEmail = currentUser.email
    const loggedUserEmail64 = base64.encode( loggedUserEmail )
    const contactEmail64 = base64.encode( contactEmail )
    dispatch({type: SEND_CHAT_MESSAGE_SUCCESS })
    await firebase.database().ref(`/chatting/${loggedUserEmail64}/${contactEmail64}`).push({ chatMessage, type: 's'})
    await firebase.database().ref(`/chatting/${contactEmail64}/${loggedUserEmail64}`).push({ chatMessage, type: 'r'})
    await firebase.database()
      .ref(`/user_chatting/${loggedUserEmail64}/${contactEmail64}`)
      .set( { name: contactName, email: contactEmail } )

    const loggedUserData = await firebase.database().ref(`/contacts/${loggedUserEmail64}`).once('value')
    const loggedUserDataObject = await first( values( loggedUserData.val() ) )
    const loggedUserName = loggedUserDataObject.name

    await firebase.database()
      .ref(`/user_chatting/${contactEmail64}/${loggedUserEmail64}`)
      .set( { name: loggedUserName, email: loggedUserEmail } )

    dispatch( { type: SEND_CHAT_MESSAGE } )
  } catch (e) {
    console.log('erro? ', e);
    dispatch( { type: SEND_CHAT_MESSAGE } )
  }
}


export const loadChatting = contactEmail  => dispatch => {
  const { currentUser } = firebase.auth()
  const loggedUserEmail64 = base64.encode( currentUser.email )
  const contactEmail64 = base64.encode( contactEmail )
  firebase
  .database().ref(`/chatting/${loggedUserEmail64}/${contactEmail64}`).on( 'value', ( snapshot ) => {
    dispatch( { type: LOAD_CHATTING, payload: map( snapshot.val(), ( val, uid ) => ( { ...val, uid } ) ) } )
  })
}

export const loadChattingList = () => dispatch => {
  const { currentUser } = firebase.auth()
  const loggedUserEmail64 = base64.encode( currentUser.email )
  firebase.database().ref(`/user_chatting/${loggedUserEmail64}`).on('value', snapshot=> {
    dispatch( { type: LOAD_CHATTING_LIST, payload: map( snapshot.val(), ( val, uid )=> ( { ...val, uid } ) ) } )
  })
}
