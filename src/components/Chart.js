import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import {LineChart} from 'react-native-charts-wrapper';

const dimensions = Dimensions.get('window')

const xAxisConfig = {
  textColor: processColor('transparent'),
  textSize: 16,
  gridColor: processColor('transparent'),
  gridLineWidth: 1,
  axisLineColor: processColor('darkgray'),
  axisLineWidth: 1.5,
  gridDashedLine: {
    lineLength: 10,
    spaceLength: 5
  },
  avoidFirstLastClipping: true,
  valueFormatter: [],
  position: 'BOTTOM',
}

const yAxisConfig = {
  left: {
    drawGridLines: false
  },
  right: {
    enabled: false
  }
}

export default class Chart extends React.Component {
  handleSelect(event) {
    let entry = event.nativeEvent
    if(entry.data && entry.data.marker) {
      this.props.updateSelectedEntry(entry.data)
    }
  }

  render() {
    const props = this.props
    const selectedEntry = props.stock.selectedEntry
    const marker = selectedEntry.marker
    const symbol = props.stock.stockSymbol

    let price = selectedEntry.y
    if(price) {
      price = `$${price}`
    }

    if(props.stock.loading) {
      return <View
        style={styles.activityContainer}
      >
        <ActivityIndicator size="large" color="#697dfb" />
      </View>
    } else {
      return (
        <View style={{flex: 1}}>

          {chartHeader(symbol, price, marker)}
          <View style={styles.container}>
            <LineChart
              style={styles.chart}
              data={props.stock.stockData}
              chartDescription={{text: ''}}
              xAxis={xAxisConfig}
              yAxis={yAxisConfig}
              legend={{ enabled: false }}
              doubleTapToZoomEnabled={false}
              onSelect={this.handleSelect.bind(this)}
            />
          </View>
        </View>
      );
    }
  }
}

const chartHeader = (symbol, price, time) => {
  return <View style={styles.stockInfoContainer}>
    <Text
      style={styles.symbol}
    >
      {symbol}
    </Text>
    <Text style={styles.priceText}>{price || "..."}</Text>
    <Text
      style={styles.timeText}
      numberOfLines={1}
    >
      {time}
    </Text>
    <View style={styles.stockInfoBottomBorder}/>
  </View>
}

const lineWidth = dimensions.width * .75
const lineColor = "#758ECD"
const styles = StyleSheet.create({
  container: {
    width: dimensions.width * .95,
    flex: 1,
  },
  activityContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  chart: {
    flex: 1
  },
  symbol: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 3,
    color: "#37393A"
  },
  timeText: {
    color: "#37393A"
  },
  priceText: {
    fontSize: 25,
  },
  stockInfoContainer: {
    borderTopColor: lineColor,
    borderTopWidth: 1,
    marginBottom: 3,
    width: lineWidth,
    height: 80,
    alignSelf: "center",
    alignItems: "center",
  },
  stockInfoBottomBorder: {
    marginTop: 4,
    width: lineWidth,
    borderBottomColor: lineColor,
    borderBottomWidth: 1,
  }
});
