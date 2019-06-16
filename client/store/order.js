/* eslint-disable complexity */
import axios from 'axios'
import cart from '../components/cart'
/**
 * ACTION TYPES
 */
const ADD_CONTAINER = 'ADD_CONTAINER'
const ADD_FLAVOR = 'ADD_FLAVOR'
const ADD_TOPPINGS = 'ADD_TOPPINGS'
const GET_ORDER_ID = 'GET_ORDER_ID'

const ADD_TO_CART = 'ADD_TO_CART'

const INCREMENT_QTY = 'INCREMENT_QTY'
const DECREMENT_QTY = 'DECREMENT_QTY'
const SUBMIT_ORDER = 'SUBMIT_ORDER'
const DELETE_ITEM = 'DELETE_ITEM'
const LOG_OUT = 'LOG_OUT'

/**
 * INITIAL STATE
 */
const initialState = {
  orderId: null,
  cart: [],
  currentItem: {
    orderId: null,
    groupId: null,
    qty: 1,
    container: null,
    flavor: null,
    toppings: []
  }
}

/**
 * ACTION CREATORS
 */

export const addContainer = container => ({type: ADD_CONTAINER, container})
export const addFlavor = flavor => ({type: ADD_FLAVOR, flavor})
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

export const deleteItem = groupId => ({type: DELETE_ITEM, groupId})

export const logOut = () => ({type: LOG_OUT})
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
export const addToCartDB = (orderId, cart) => async dispatch => {
  try {
    let update = {orderId, cart}
    await axios.put('/api/orders/add', update)
  } catch (err) {
    console.error(err)
  }
}

export const submitOrder = (orderId, cart, price) => async dispatch => {
  try {
    let update = {orderId, cart, price}
    await axios.put('/api/orders/submit', update)
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
    case ADD_CONTAINER: {
      return {
        ...state,
        currentItem: {
          ...state.currentItem,
          container: action.container
        }
      }
    }
    case ADD_FLAVOR:
      return {
        ...state,
        currentItem: {...state.currentItem, flavor: action.flavor}
      }
    case ADD_TOPPINGS:
      return {
        ...state,
        currentItem: {
          ...state.currentItem,
          toppings: action.toppings,
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
      return {...initialState, orderId: state.orderId}

    case GET_ORDER_ID:
      return {
        ...state,
        currentItem: {...state.currentItem, orderId: action.orderId},
        orderId: action.orderId
      }

    case INCREMENT_QTY: {
      let thisGroup = [...state.cart]
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
      let thisGroup = [...state.cart]
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
    case DELETE_ITEM: {
      let newCart = [...state.cart]
      newCart = newCart.filter(item => {
        return item.groupId !== action.groupId
      })
      return {
        ...state,
        cart: newCart
      }
    }
    case LOG_OUT: {
      return initialState
    }
    default:
      return state
  }
}
