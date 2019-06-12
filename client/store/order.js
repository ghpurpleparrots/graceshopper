import axios from 'axios'
/**
 * ACTION TYPES
 */
const ADD_TOPPINGS = 'ADD_TOPPINGS'
const GET_ORDER_ID = 'GET_ORDER_ID'

/**
 * INITIAL STATE
 */
const initialState = {
  cart: [],
  currentItem: {
    orderId: null,
    groupId: null,
    qty: 1,
    products: []
  }
}

/**
 * ACTION CREATORS
 */
export const addToppings = toppings => ({type: ADD_TOPPINGS, toppings})
const gotOrderId = orderId => ({type: GET_ORDER_ID, orderId})

/**
 * THUNK CREATORS
 */
export const getOrderId = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${userId}`)
    dispatch(gotOrderId(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_ID:
      return {
        ...state,
        currentItem: {...state.currentItem, orderId: action.orderId}
      }
    default:
      return state
  }
}
