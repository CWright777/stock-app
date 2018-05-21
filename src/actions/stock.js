export const actions = {}
export const STOCK_DATA_RECEIVED = "STOCK_DATA_RECEIVED"
export const STOCK_DATA_REQUESTED = "STOCK_DATA_REQUESTED"

import queryString from "query-string"
import Config from 'react-native-config'

const stockQuoteHost= "https://www.alphavantage.co/query?"

actions.getStockInfo = (symbol,interval) => {
  return async function(dispatch) {
    dispatch({
      type: STOCK_DATA_REQUESTED
    })
    const query = {
      function: "TIME_SERIES_INTRADAY",
      symbol,
      apikey: Config.ALPHA_ADVANTAGE_API_KEY,
      interval
    }
    const stringifiedQuery = queryString.stringify(query)

    const [response, json] = await fetch(`${stockQuoteHost}${stringifiedQuery}`).then(parseResponse)
    if (response.ok) {
      dispatch({
        type: STOCK_DATA_RECEIVED,
        payload: json,
      })

      return Promise.resolve()
    } else {
      return Promise.reject(new Error("Something went wrong"))
    }
  }
}

function parseResponse(response) {
  return Promise.all([response, response.json()])
}
