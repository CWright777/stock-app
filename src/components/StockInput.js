import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native';

import { Madoka } from 'react-native-textinput-effects'

export default class StockInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: ""
    }
  }

  submitSymbol() {
    if(this.state.symbol.trim() !== "") {
    const symbol = this.state.symbol
    const getStockInfo = _=>this.props.getStockInfo(symbol, "60min")
      .then(_=>{
        this.setState({symbol: ""})
      })
    setTimeout(getStockInfo, 500)
    }
  }

  onChangeText(symbol) {
    this.setState({
      symbol: symbol.toUpperCase()
    })
  }

  render() {
    return <Madoka
      style={styles.input}
      label={'Stock Symbol'}
      borderColor={'#CBD2FA'}
      labelStyle={{ color: '#77B6EA' }}
      inputStyle={{ color: '#37393A' }}
      onSubmitEditing={this.submitSymbol.bind(this)}
      onChangeText={this.onChangeText.bind(this)}
      value={this.state.symbol}
    />
  }
}

const styles = StyleSheet.create({
  input: {
    width: 275,
    height: 30,
  }
});
