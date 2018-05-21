import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native'
import Chart from '../components/Chart'
import StockInput from '../components/StockInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const dimensions = Dimensions.get('window')

export default class StockQuoteChart extends Component {
  componentWillMount() {
    this.props.getStockInfo("SPY", "60min")
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={{backgroundColor: "#E8EEF2"}}
        contentContainerStyle={styles.container}
        behavior="position"
        enabled
        scrollEnabled={false}
      >
        <View style={styles.chartContainer}>
          <Chart {...this.props}/>
        </View>
        <View style={styles.inputContainer}>
          <StockInput {...this.props} />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    height: dimensions.height * .8
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})
