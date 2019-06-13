import axios from 'axios'
/**
 * ACTION TYPES
 */
const ADD_TOPPINGS = 'ADD_TOPPINGS'
const GET_ORDER_ID = 'GET_ORDER_ID'
const ADD_CONTAINER = 'ADD_CONTAINER'
const ADD_TO_CART = 'ADD_TO_CART'

const INCREMENT_QTY = 'INCREMENT_QTY'
const DECREMENT_QTY = 'DECREMENT_QTY'
const SUBMIT_ORDER = 'SUBMIT_ORDER'


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

export const addContainer = container => ({type: ADD_CONTAINER, container})

export const addToppings = (toppings, groupId) => ({
  type: ADD_TOPPINGS,
  toppings,
  groupId
})
export const addToCart = () => ({type: ADD_TO_CART})
export const submittedOrder = () => ({type: SUBMIT_ORDER})

const gotOrderId = orderId => ({type: GET_ORDER_ID, orderId})

export const incrementQty = groupId => ({type: INCREMENT_QTY, groupId})

export const decrementQty = groupId => ({type: DECREMENT_QTY, groupId})

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

export const submitOrder = (orderId, cart) => async dispatch => {
  try {
    let update = {orderId, cart}
    await axios.put('/api/orders', update)
    dispatch(submittedOrder())
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
        currentItem: {
          ...initialState.currentItem,
          orderId: state.currentItem.orderId
        }
      }
    case SUBMIT_ORDER:
      return initialState

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
    case INCREMENT_QTY: {
      let thisGroup = state.cart
      thisGroup.map(item => {
        if (item.groupId === action.groupId) {
          item.qty += 1
          return item
        } else return item
      })
      return {
        ...state,
        cart: thisGroup
      }
    }
    case DECREMENT_QTY: {
      let thisGroup = state.cart
      thisGroup.map(item => {
        if (item.groupId === action.groupId) {
          item.qty -= 1
          return item
        } else return item
      })
      return {
        ...state,
        cart: thisGroup
      }
    }
    default:
      return state
  }
}
