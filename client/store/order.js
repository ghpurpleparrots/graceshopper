/**
 * ACTION TYPES
 */
const ADD_TO_ORDER = 'ADD_TO_ORDER'

/**
 * INITIAL STATE
 */
const initialState = {
  allOrders: [],
  currentOrder: {}
}

/**
 * ACTION CREATORS
 */
const addToOrder = products => ({type: ADD_TO_ORDER, products})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_ORDER:
      return {
        ...state,
        currentOrder: Object.assign(currentOrder, action.products)
      }
    default:
      return state
  }
}
