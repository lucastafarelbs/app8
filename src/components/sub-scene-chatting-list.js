import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { View, Text, StyleSheet, ListView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { loadChattingList } from '../actions/chatting-actions'
const functionsState = Object.assign({}, { loadChattingList })

const mapStateToProps = state => ({
  chattingList: state.ChattingReducers.chattingList
})


class subSceneChattingList extends Component <{}> {

  componentWillMount() {
    this.props.loadChattingList()
    this.createDataSource( this.props.chattingList )
  }

  componentWillReceiveProps( newProps ) {
    this.createDataSource( newProps.chattingList )
  }

  createDataSource( chattingList ) {
    const ds = new ListView.DataSource( { rowHasChanged: (r1, r2) => ( r1 !== r2 ) } )
    this.dataSource = ds.cloneWithRows( chattingList )
  }

  renderRow( contact ) {
    const { listRowContainer, listRowTitle, listRowSubTitle } = styles
    return (
      <TouchableOpacity
        onPress={ ()=> Actions.sceneChat({title: contact.name, contactName: contact.name, contactEmail: contact.email }) }>
        <View style={ listRowContainer }>
          <Text style={ listRowTitle }> { contact.name } </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { mainContainer } = styles
    return (
      <View style={ mainContainer }>
        <ListView
          style={ mainContainer }
          enableEmptySections
          dataSource={ this.dataSource }
          renderRow={ this.renderRow }
        />
      </View>
    )
  }
}

export default connect ( mapStateToProps, functionsState )( subSceneChattingList )

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
  , listRowContainer: {
      padding: 10
    , paddingVertical: 20
    , borderColor: '#CCC'
    , borderBottomWidth: 1
  }
  , listRowTitle:{
      fontSize: 22
  }
})
