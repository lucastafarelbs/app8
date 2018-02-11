import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { changeEmail, changePassword, sendDataToLogin, authenticateUser } from '../actions/authentication-actions'

const mapStateToProps = state => ({
    email: state.AuthenticationReducers.email
  , password: state.AuthenticationReducers.password
  , authenticationError: state.AuthenticationReducers.authenticationError
  , authenticationIsRunning: state.AuthenticationReducers.authenticationIsRunning
})

class sceneLogin extends Component<{}> {
  authenticate() {
    const {email, password} = this.props
    this.props.authenticateUser( { email, password })
  }

  renderBtnAcessr() {
    if ( this.props.authenticationIsRunning ){
      return (
        <View style={ styles.buttonContainer }>
          <ActivityIndicator size={50} color="#fff" />
        </View>
      )
    }
    return (
      <View style={ styles.buttonContainer }>
        <TouchableOpacity
          onPress={ ()=> this.authenticate() }
          style={ styles.customButton }>
          <Text style={ styles.customButtonText } > Login </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={ () => Actions.sceneRegister() }>
          <Text style={ styles.buttonLink }> Ainda não tem cadastro? Cadastre-se! </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render( ) {
    return (
      <ImageBackground style={ styles.imageBackground } source={require('../../imgs/bg.png')}>
        <View  style={ styles.mainContainer } >
          <View style={ styles.titleContainer }>
            <Text style={ styles.title} > Whatsapp Clone </Text>
          </View>
          <View style={ styles.inputsContainer }>
            <TextInput
              onChangeText= { text => this.props.changeEmail( text ) }
              value={ this.props.email }
              style={ styles.input }
              placeholder='e-mail'
              placeholderTextColor='#fff'
              underlineColorAndroid='#fff'/>
            <TextInput
              onChangeText= { text => this.props.changePassword( text ) }
              value={ this.props.password }
              style={ styles.input }
              secureTextEntry
              placeholder='password'
              placeholderTextColor='#fff'
              underlineColorAndroid='#fff'/>

            <Text style={ styles.inputErrorText }> { this.props.authenticationError } </Text>
          </View>

            { this.renderBtnAcessr() }
        </View>
      </ImageBackground>
    )
  }
}

export default connect( mapStateToProps, { changeEmail, changePassword, authenticateUser } )( sceneLogin )

const styles = StyleSheet.create({
  imageBackground:{
    flex: 1,
  },
  mainContainer:{
    flex: 1,
    backgroundColor: 'transparent',
    padding: 10
  },
  titleContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    fontSize: 20,
    color: 'whitesmoke',
  },
  inputsContainer: {
    flex: 2,
  },
  input: {
    fontSize: 20,
    height: 45,
    marginTop: 10,
    color:'#fff'
  },
  inputErrorText: {
    textAlign: 'center',
    color: 'orange',
    fontSize: 20
  },
  buttonContainer: {
    flex: 2,
  },
  customButton: {
    paddingVertical: 7,
    borderWidth: 2,
    borderColor: 'whitesmoke',
    borderRadius: 3,
    shadowColor: 'black',
    shadowOffset: {width:10, height:20},
    shadowOpacity: 1,
    elevation:2
  },
  customButtonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'whitesmoke',
  },
  buttonLink:{
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    color: 'whitesmoke'
  },
})
