import React, { Component } from 'react'
import { AppRegistry } from 'react-native';
import store from './src/store.js'
import App from './src/App';
import { Provider } from 'react-redux'

class StockApp extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}


AppRegistry.registerComponent('stockApp', () => StockApp);
