import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { View, Text, StyleSheet, ListView, TouchableOpacity } from 'react-native'
import { getAllContacts } from '../actions/contacts-actions'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  contacts: state.ContactsReducers.contacts
})

class subSceneContacts extends Component<{}> {

  componentWillMount() {
    this.props.getAllContacts()
    this.createDataSource( this.props.contacts )
  }

  componentWillReceiveProps( nextProps ) {
    this.createDataSource( nextProps.contacts )
  }

  createDataSource( contacts ) {
    const ds = new ListView.DataSource( { rowHasChanged: ( r1, r2 ) => r1 !== r2 } )
    this.dataSource = ds.cloneWithRows( contacts )
  }

  renderRow( contact ) {
    const { mainContainer, row, title, subTitle } = styles
    return (
      <TouchableOpacity onPress={ ()=> Actions.sceneChat({title: contact.name, contactName: contact.name, contactEmail: contact.email }) }>
        <View style={ row }>
          <Text style={ title }> { contact.name } </Text>
          <Text style={ subTitle }> { contact.email } </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { mainContainer } = styles
    return (
      <ListView
        enableEmptySections
        dataSource={ this.dataSource }
        style={ mainContainer }
        renderRow={ data => this.renderRow( data ) }
      />
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex:1
  }
  , row: {
      borderColor: "#CCC"
    , padding: 10
    , borderBottomWidth: 1
  }
  , title: {
      fontSize: 21
  }
  , subTitle: {
      fontSize: 18
  }

})

export default connect( mapStateToProps, { getAllContacts } ) ( subSceneContacts )
