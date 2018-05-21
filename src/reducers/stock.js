import createReducer from '../utils/create-reducer'
import {
  STOCK_DATA_RECEIVED,
  STOCK_DATA_REQUESTED
} from "../actions/stock"

import * as d3Shape from 'd3-shape'
import * as d3Scale from 'd3-scale'
import moment from "moment"

import {
  processColor
} from 'react-native';

const initialState = {
  loading: true,
  stockData: null,
  stockSymbol: null
}

export default createReducer(initialState, {
  [STOCK_DATA_REQUESTED](state, { payload }) {
    return initialState
  },
  [STOCK_DATA_RECEIVED](state, { payload }) {
    const metaData = payload["Meta Data"]
    const interval = metaData["4. Interval"]
    const symbol = metaData["2. Symbol"]
    const timeSeriesData = payload[`Time Series (${interval})`]

    const stockData = processTimeSeriesData(timeSeriesData).reverse()

    return {
      loading: false,
      stockSymbol: symbol,
      stockData: {
        dataSets: [{
          values: stockData,
          label: '',
          config: {
            lineWidth: 1.5,
            drawCircles: false,
            drawCubicIntensity: 0.3,
            drawCubic: false,
            drawValues: false,
            drawHighlightIndicators: false,
            color: processColor("#758ECD"),
            drawFilled: true,
            fillColor: processColor("#697dfb"),
            fillAlpha: 90
          }
        }]
      }
    }
  }
})

function processTimeSeriesData(timeSeriesData) {
  return Object.keys(timeSeriesData).map(timeStr=>{
    console.log(timeSeriesData[timeStr])
    return {
      y: Number(timeSeriesData[timeStr]["4. close"]),
      marker: moment(timeStr).format("dddd, MMMM Do YYYY, h:mm:ss a")
    }
  })
}
