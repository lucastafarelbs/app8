import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import base64 from 'base-64'
import {
    CHANGE_NAME
  , CHANGE_EMAIL
  , CHANGE_PASSWORD
  , AUTHENTICATION_ERROR
  , AUTHENTICATION_SUCCESS
  , AUTHENTICATION_IS_RUNNING
  , REGISTER_ERROR
  , REGISTER_SUCCESS
  , REGISTER_IS_RUNNING
  , GET_ALL_CONTACTS
} from  './types'

export const changeName = text => {
  return {
    type: CHANGE_NAME,
    payload: text
  }
}

export const changeEmail = text => {
  return {
    type: CHANGE_EMAIL,
    payload: text
  }
}

export const changePassword = text => {
  return {
    type: CHANGE_PASSWORD,
    payload: text
  }
}

export const authenticateUser = ( { email, password } ) => async dispatch => {
  try {
    dispatch( { type: AUTHENTICATION_IS_RUNNING, payload:  true  } )
    const authenticatedUser  = await firebase.auth().signInWithEmailAndPassword( email, password )
    authenticationSuccess( dispatch )
  } catch ( err ) {
    authenticationError( err, dispatch )
  }
}

const authenticationSuccess = (dispatch) => {
  dispatch ({ type: AUTHENTICATION_SUCCESS  })
  Actions.sceneMain()
}

const authenticationError = (err, dispatch) => {
  dispatch ({ type: AUTHENTICATION_ERROR, payload: err.message });
}

export const logout = () => async dispatch => {
  try {
    await firebase.auth().signOut()
    Actions.sceneLogin()
  } catch (e) {
    alert( e.message )
    console.log('Error', e);
  }
}


export const sendDataToRegister =  ({ name, email, password }) => async dispatch => {
  try {
    dispatch( { type: REGISTER_IS_RUNNING, payload: true } )
    const createdUser  = await firebase.auth().createUserWithEmailAndPassword( email, password )
    const email64 = base64.encode( email )
    const createContact = await firebase.database().ref(`/contacts/${ email64 }`).push({ name })
    registerSuccess( dispatch )
  } catch ( err ) {
    registerError( err, dispatch )
  }
}

const registerSuccess = (dispatch) => {
  dispatch ({ type: REGISTER_SUCCESS })
  Actions.sceneRegisterSuccess()
}

const registerError = (err, dispatch) => {
    dispatch ({ type: REGISTER_ERROR, payload: err.message });
}
