/**
 * ACTION TYPES
 */
const ADD_TOPPINGS = 'ADD_TOPPINGS'

/**
 * INITIAL STATE
 */
const initialState = {
  allOrders: [],
  currentItem: {
    container: null,
    flavor: null,
    toppings: []
  }
}

/**
 * ACTION CREATORS
 */
export const addToppings = toppings => ({type: ADD_TOPPINGS, toppings})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TOPPINGS:
      return {
        ...state,
        currentItem: {...state.currentItem, toppings: action.toppings}
      }
    default:
      return state
  }
}
