import axios from 'axios'
/**
 * ACTION TYPES
 */
const ADD_TOPPINGS = 'ADD_TOPPINGS'
const GET_ORDER_ID = 'GET_ORDER_ID'
const ADD_CONTAINER = 'ADD_CONTAINER'
const ADD_TO_CART = 'ADD_TO_CART'

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
export const addContainer = container => ({type: ADD_CONTAINER, container})

export const addToppings = (toppings, groupId) => ({
  type: ADD_TOPPINGS,
  toppings,
  groupId
})
export const addToCart = () => ({type: ADD_TO_CART})

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
    case ADD_TOPPINGS:
      return {
        ...state,
        currentItem: {
          ...state.currentItem,
          products: [...state.currentItem.products, ...action.toppings],
          groupId: action.groupId
        }
      }
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, state.currentItem],
        currentItem: initialState.currentItem
      }
    case GET_ORDER_ID:
      return {
        ...state,
        currentItem: {...state.currentItem, orderId: action.orderId}
      }
    case ADD_CONTAINER: {
      return {
        ...state,
        currentItem: {
          ...state.currentItem,
          products: [...state.currentItem.products, action.container]
        }
      }
    }
    default:
      return state
  }
}
