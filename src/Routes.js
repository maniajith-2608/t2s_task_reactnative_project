/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Test from "./test"

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "Test" component = {Test} title = "Home"  initial = {true} hideNavBar={true}/>
      </Scene>
   </Router>
   
)
export default Routes