import { Actions } from 'react-native-router-flux'
import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native'
import { connect } from 'react-redux'
import { changeName, changeEmail, changePassword, sendDataToRegister } from '../actions/authentication-actions'

const sceneRegisterSuccess = () => (
  <ImageBackground style={ styles.imageBackground } source={require('../../imgs/bg.png')}>
    <View style={ styles.mainContainer }>
      <View style={ styles.welcomeContainer }>
        <Text style={ styles.welcomeTitle} > Cadastro Efetuado com Sucesso. Você já pode fazer login </Text>
        <Image style={ styles.welcomeImage } source= { require('../../imgs/logo.png') } />
      </View>

      <View style={ styles.buttonContainer }>
        <TouchableOpacity onPress={ () => { Actions.sceneLogin() } }
          style={ styles.customButton }>
          <Text style={ styles.customButtonText } > Fazer Login </Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
)

export default sceneRegisterSuccess

const styles = StyleSheet.create({
  imageBackground:{
    flex: 1,
  },
  mainContainer:{
    flex: 1,
    backgroundColor: 'transparent',
    padding: 10
  },
  welcomeContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems:'center',
  },
  welcomeTitle: {
    color: 'whitesmoke',
    fontSize: 20,
    textAlign: 'center'
  },
  welcomeImage: {
    marginTop: 50
  },
  buttonContainer: {
    justifyContent: 'center',
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
    color: '#fff',
  },
})
