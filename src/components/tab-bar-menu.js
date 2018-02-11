import React from 'react'
import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native'
import { TabBar } from 'react-native-tab-view'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { enableToAdd } from '../actions/contacts-actions'
import { logout } from '../actions/authentication-actions'

const tabBarMenu = props => (
  <View style={ { backgroundColor:"#115E54", elevation:4, marginBottom: 6 } }>
    <StatusBar backgroundColor="#114D44" />

    <View style={ { height: 50 , alignItems: 'center', justifyContent:'space-between', paddingHorizontal: 5 , flexDirection:'row' } }>
      <View >
        <Text style={ { color: '#FFF', fontSize: 20 } }> Whatsapp Clone </Text>
      </View>
      <View style={ { flexDirection:'row', alignItems:'center' } }>
        <View style={{marginRight:20}}>
          <TouchableOpacity onPress={ () => {
              Actions.sceneAddContact()
              props.enableToAdd()
            }}>
            <Image source={ require( '../../imgs/add-contact.png' ) } />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={ () => { props.logout() } }>
            <Text style={ { color: '#FFF', fontSize: 20 } }> Sair </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    <TabBar { ...props } style={{backgroundColor:"#115E54", elevation: 0 }}/>
  </View>
)

export default connect( null, { enableToAdd, logout })( tabBarMenu )
