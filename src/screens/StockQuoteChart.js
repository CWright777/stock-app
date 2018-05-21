import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
} from 'react-native'
import Chart from '../components/Chart'
import StockInput from '../components/StockInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BullImage from "../assets/images/bull.png"

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
        extraScrollHeight={13}
      >
        <Image
          source={BullImage}
          style={styles.bullImage}
        />
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
    marginTop: 60
  },
  chartContainer: {
    height: dimensions.height * .65
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  bullImage: {
    height: dimensions.height * .07,
    resizeMode: "contain",
    marginBottom: 10
  }
})
