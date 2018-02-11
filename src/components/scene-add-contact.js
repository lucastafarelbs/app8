import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import { contactsChangeEmail, addContact } from '../actions/contacts-actions'

const mapStatesToProps = state => ({
    email: state.ContactsReducers.contactsEmail
  , error: state.ContactsReducers.addContactError
  , addContactIsRunning: state.ContactsReducers.addContactIsRunning
  , contactsIsAdded: state.ContactsReducers.contactsIsAdded
})

class sceneAddContact extends Component <{}> {
    renderForm() {
      const {mainContainer, inputsContainer, input, buttonsContainer, customButton, customButtonText, errorText } = styles
      const renderLoading = () => {
        if (!this.props.addContactIsRunning) {
          return (
            <TouchableOpacity
              style={ customButton }
              onPress={ () => this.props.addContact( this.props.email ) }>
              <Text style={ customButtonText }> Adicionar Contato </Text>
            </TouchableOpacity>
          )
        }
        return (
          <ActivityIndicator size={50} color="#fff" />
        )
      }
      if ( !this.props.contactsIsAdded ){
        return (
          <View style={ mainContainer }>
            <View style={ inputsContainer }>
              <TextInput
                onChangeText= { text => this.props.contactsChangeEmail( text )  }
                value={ this.props.email }
                style={ input }
                placeholder='e-mail'
                placeholderTextColor='#fff'
                underlineColorAndroid='#fff'/>
              <Text style={ errorText }> { this.props.error } </Text>
            </View>
            <View style={ buttonsContainer }>
              {
                renderLoading()
              }
            </View>
          </View>
        )
      }
      return (
        <View style={ mainContainer }>
          <Text style={ customButtonText }> Contato Adicionado Com Sucesso!</Text>
        </View>
      )
    }

    render() {
      return (
        <View style={ { flex: 1 } }>
          { this.renderForm() }
        </View>
      )
    }
}

export default connect( mapStatesToProps, { contactsChangeEmail, addContact })( sceneAddContact )

const styles= StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#115E54',
    padding: 20
  }
  , inputsContainer: {
    flex: 2,
    justifyContent: 'center',
    justifyContent: 'flex-end',
    marginBottom:20,
  }
  , input: {
    fontSize: 20,
    height: 45,
    marginTop: 10,
    color:'#fff'
  }
  , buttonsContainer: {
    flex: 2,
    justifyContent: 'flex-start',
  }
  , customButton: {
    paddingVertical: 7,
    borderWidth: 2,
    borderColor: 'whitesmoke',
    borderRadius: 3,
    shadowColor: 'black',
    shadowOffset: {width:10, height:20},
    shadowOpacity: 1,
    elevation:2
  }
  , customButtonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'whitesmoke',
  },
  errorText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'orange',
  }
})
