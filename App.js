import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import firebase from 'firebase'
import ReduxThunk from 'redux-thunk'

import Routes from './src/routes'
import reducers from './src/reducers'

class App extends Component<{}> {
  componentWillMount( ){
    const config = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: ""
    };
    firebase.initializeApp( config );
  }

  render( ) {
    console.ignoredYellowBox = [ 'Setting a timer' ]
    return (
      <Provider store={ createStore( reducers, applyMiddleware( ReduxThunk ) ) }>
        <Routes />
      </Provider>
    )
  }
}

export default App
