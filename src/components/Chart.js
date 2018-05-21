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


export default class Chart extends React.Component {

  constructor() {
    super();

    this.state = {
      selectedEntry: {
        marker: "",
        y: ""
      },
      data: {},
      xAxis: {
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
      },
      yAxis: {
        left: {
          drawGridLines: false
        },
        right: {
          enabled: false
        }
      }
    };
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      if(entry.data && entry.data.marker) {
        this.setState({...this.state, selectedEntry: entry.data})
      }
    }
  }

  render() {
    const selectedEntry = this.state.selectedEntry
    const marker = selectedEntry.marker
    const symbol = this.props.stock.stockSymbol

    let price = selectedEntry.y
    if(price) {
      price = `$${price}`
    }

    if(this.props.stock.loading) {
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
              data={this.props.stock.stockData}
              chartDescription={{text: ''}}
              xAxis={this.state.xAxis}
              yAxis={this.state.yAxis}
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
    <Text style={styles.timeText}>{time}</Text>
    <View style={styles.stockInfoBottomBorder}/>
  </View>
}

const lineWidth = dimensions.width * .7
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
    width: lineWidth,
    marginTop: 60,
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
