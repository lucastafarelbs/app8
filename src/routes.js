import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import SceneLogin from './components/scene-login'
import SceneRegister from './components/scene-register'
import SceneRegisterSuccess from './components/scene-register-success'
import SceneMain from './components/scene-main'
import SceneAddContact from './components/scene-add-contact'
import SceneChat from './components/scene-chat'

const Routes = () => (
  <Router navigationBarStyle={{ backgroundColor: '#115E54'}} titleStyle={{ color: '#FFF'}}>
    <Scene key="root">
      <Scene key="sceneLogin" component={SceneLogin} title="Login" hideNavBar />
      <Scene key="sceneRegister" component={SceneRegister} title="Cadastro" hideNavBar />
      <Scene key="sceneRegisterSuccess" component={SceneRegisterSuccess} title="Sucesso" hideNavBar />
      <Scene key="sceneMain" component={SceneMain} title="Home" hideNavBar />
      <Scene key="sceneAddContact" component={SceneAddContact} title="Adicionar Contato" hideNavBar={ false }/>
      <Scene key="sceneChat" component={SceneChat} title="Conversa" hideNavBar={ false }/>
    </Scene>
  </Router>
)

export default Routes
