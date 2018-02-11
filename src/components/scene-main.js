import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { TabViewAnimated, SceneMap } from 'react-native-tab-view';
import TabBarMenu from './tab-bar-menu'

import SubSceneMessages from './sub-scene-chatting-list'
import SubSceneContacts from './sub-scene-contacts-list'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const mapStateToProps = state => ({})

class sceneMain extends Component<{}> {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Conversas' },
      { key: '2', title: 'Contatos' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBarMenu { ...props } />;

  _renderScene = SceneMap({
      '1': SubSceneMessages
    , '2': SubSceneContacts
  });
  render( ) {
    return (

        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />

    )
  }
}

export default connect( null, {} )( sceneMain )

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
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
    color: 'blue',
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
