import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ListView } from 'react-native'
import { connect } from 'react-redux'
import { changeChatMessage, sendChatMessage, loadChatting } from '../actions/chatting-actions'

const mapStateToProps = state => ({
    chatting: state.ChattingReducers.chatting
  , chatMessage: state.ChattingReducers.chatMessage
})

class sceneChat extends Component<{}> {
  componentWillMount() {
    this.props.loadChatting( this.props.contactEmail )
    this.createDataSource( this.props.chatting )
  }

  componentWillReceiveProps( nextProps ) {
    if ( nextProps.contactEmail !== this.props.contactEmail )
      this.props.loadChatting( nextProps.contactEmail )
    this.createDataSource( nextProps.chatting )
  }

  renderRow( text ) {
    const { sentMessageContainer, receivedMessageContainer, sentMessageText, receivedMessageText } = styles
    if ( text.type === 's' ){
      return (
        <View style={ sentMessageContainer }>
          <Text style={ sentMessageText }> { text.chatMessage } </Text>
        </View>
      )
    }
    return (
      <View style={ receivedMessageContainer }>
        <Text style={ receivedMessageText }> { text.chatMessage } </Text>
      </View>
    )
  }

  createDataSource( chatting ) {
    const ds = new ListView.DataSource( { rowHasChanged: ( r1, r2 ) => r1 !== r2 } )
    this.dataSource = ds.cloneWithRows( chatting )
  }

  sendMessage() {
    const { chatMessage, contactName, contactEmail } = this.props
    this.props.sendChatMessage( { chatMessage, contactName, contactEmail } )
  }
  render() {
    const { mainContainer, messagesContainer, inputContainer, textInput, buttonInput } = styles
    return (
      <View style={ mainContainer }>
        <View style={ messagesContainer }>
          <ListView
            enableEmptySections
            dataSource={ this.dataSource }
            renderRow={ data => this.renderRow( data ) }
          />
        </View>
        <View style={ inputContainer }>
          <TextInput
            style={ textInput }
            onChangeText= { text => this.props.changeChatMessage( text ) }
            value={ this.props.chatMessage }
          />
          <TouchableOpacity onPress={ this.sendMessage.bind(this) } >
            <Image style={ buttonInput } source={ require('../../imgs/enviar_mensagem.png') } />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default connect( mapStateToProps, { changeChatMessage, sendChatMessage, loadChatting } ) ( sceneChat )

const styles = StyleSheet.create({
  sentMessageContainer: {
      alignItems: 'flex-end'
    , marginVertical: 5
    , marginLeft: 40
  }
  , sentMessageText: {
      fontSize: 18
    , padding: 10
    , backgroundColor: '#dbf5b4'
    , elevation: 2
  }
  , receivedMessageContainer: {
      alignItems: 'flex-start'
    , marginVertical: 5
    , marginRight: 40
  }
  , receivedMessageText: {
      fontSize: 18
    , padding: 10
    , backgroundColor: '#F7F7F7'
    , elevation: 2
  }
  , mainContainer: {
      flex: 1
    , padding: 10
    , backgroundColor: '#eee4dc'
  }
  , messagesContainer: {
      flex: 1
    , paddingBottom: 20
  }
  , inputContainer: {
      flexDirection: 'row'
    , height: 60
  }
  , textInput: {
      flex: 4
    , backgroundColor: 'whitesmoke'
    , fontSize: 18
  }
  , buttonInput: {
      flex: 2
    ,
  }
})
