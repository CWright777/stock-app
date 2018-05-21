import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native'
import Chart from '../components/Chart'
import StockInput from '../components/StockInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BullImage from "../assets/images/bull.png"

const dimensions = Dimensions.get('window')

export default class StockQuoteChart extends Component {
  componentWillMount() {
    this.props.getStockInfo("GBTC", "60min")
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAwareScrollView
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
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E8EEF2",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  chartContainer: {
    height: dimensions.height * .7
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  bullImage: {
    height: dimensions.height * .07,
    resizeMode: "contain",
    marginBottom: 20
  }
})
