import stock from './stock'

export default function(state = {}, action) {
  return {
    stock: stock(state.stock, action)
  }
}
