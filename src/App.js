import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import StockQuoteChartScreen from './screens/StockQuoteChart'
import { bindActionCreators } from 'redux'
import { actions as stockActions } from './actions/stock'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return <StockQuoteChartScreen
        {...this.props}
      />
  }
}

const mapStateToProps = function(state) {
  return {
    stock: state.stock,
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    ...bindActionCreators(stockActions, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})
