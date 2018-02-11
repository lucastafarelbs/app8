import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { changeName, changeEmail, changePassword, sendDataToRegister } from '../actions/authentication-actions'

const mapStateToProps = state => ({
    name: state.AuthenticationReducers.name
  , email: state.AuthenticationReducers.email
  , password: state.AuthenticationReducers.password
  , registerError: state.AuthenticationReducers.registerError
  , registerIsRunning: state.AuthenticationReducers.registerIsRunning
})

class sceneRegister extends Component<{}> {
  register () {
    const { name, email, password } = this.props
    this.props.sendDataToRegister({name, email, password})
  }
  renderButtons() {
    if ( this.props.registerIsRunning ) {
      return (
        <View style={ styles.buttonContainer }>
          <ActivityIndicator size={50} color="#fff" />
        </View>
      )
    }

    return (
      <View style={ styles.buttonContainer }>
        <TouchableOpacity onPress= {
          () => { this.register() } } style={ styles.customButton }>
          <Text style={ styles.customButtonText } > Cadastrar </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ () => {
          this.props.changeName( '' )
          this.props.changeEmail( '' )
          this.props.changePassword( '' )
          Actions.sceneLogin() } }
          style={ [styles.customButton, styles.customButtonCancel ] }>
          <Text style={ [ styles.customButtonText, styles.customButtonTextCancel ] } > Cancelar </Text>
        </TouchableOpacity>
      </View>
    )
  }
  render(){
    return (
      <ImageBackground style={ styles.imageBackground } source={require('../../imgs/bg.png')}>
        <View style={ styles.mainContainer }>
          <View style={ styles.formContainer }>
            <TextInput
              onChangeText= { text => this.props.changeName( text ) }
              value={ this.props.name } style={ styles.formInput }
              placeholder='nome' placeholderTextColor='#fff'
              underlineColorAndroid='#fff' />
            <TextInput
              onChangeText= { text => this.props.changeEmail( text ) }
              value={ this.props.email } style={ styles.formInput }
              placeholder='e-mail' placeholderTextColor='#fff'
              underlineColorAndroid='#fff' />
            <TextInput
              onChangeText= { text => this.props.changePassword( text ) }
              secureTextEntry
              value={ this.props.password } style={ styles.formInput }
              placeholder='password' placeholderTextColor='#fff'
              underlineColorAndroid='#fff' />
            <Text style={styles.formError}>
              { this.props.registerError }
            </Text>
          </View>

          { this.renderButtons() }
        </View>
      </ImageBackground>
    )
  }
}


export default connect(
  mapStateToProps,
  {
    changeName,
    changeEmail,
    changePassword,
    sendDataToRegister
  }
) ( sceneRegister )

const styles = StyleSheet.create({
  imageBackground:{
    flex: 1,
  },
  formError:{
    color: 'orange',
    fontSize: 20,
    textAlign:'center'
  },
  mainContainer:{
    flex: 1,
    backgroundColor: 'transparent',
    padding: 10
  },
  formContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  formInput: {
    fontSize: 20,
    height: 45,
    color:'#fff'
  },
  buttonContainer: {
    flex: 2,
  },
  customButton: {
    marginTop: 10,
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
    color: '#fff',
  },
  customButtonCancel: {
    borderColor: '#c12',
  },
  customButtonTextCancel: {
    color: '#c12',
  },
  buttonLink:{
    marginTop: 20,
    textAlign: 'center',
    color: '#1234AB',
  },
})
/*const validation = ( data ) => {
  const errors = []
  if ( !data.name )
    errors.push('Preencha o Nome.')
  if ( !data.email )
    errors.push('Preencha o Email.')
  if ( !data.password )
    errors.push('Preencha a Senha.')
  return errors
}*/
