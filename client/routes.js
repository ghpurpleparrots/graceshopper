import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Home,
  AllProducts,
  Cart,
  SelectContainer,
  Checkout,
  AddToppings,
  SignUp,
  SignUpConfirmation,
  Flavors,
  Profile
} from './components'
import {me, getCart, getProducts} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {isLoaded: false}
  }
  async componentDidMount() {
    await this.props.loadInitialData()
    await this.props.getProducts()
    await this.props.getCart(this.props.userId)
    this.setState({isLoaded: true})
  }
  componentDidUpdate() {
    if (this.props.userId) {
      this.props.getCart(this.props.userId)
    }
  }

  render() {
    console.log(this.props.userId)
    const {isLoggedIn} = this.props
    const {isLoaded} = this.state
    return (
      <div>
        {isLoaded && (
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/" component={Home} />
            <Route path="/products" component={AllProducts} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route
              exact
              path="/sign-up-confirm"
              component={SignUpConfirmation}
            />
            <Route path="/cart" component={Cart} />

            {/* Routes placed here are only available after logging in */}

            {isLoggedIn && (
              <Switch>
                <Route path="/start-order" component={SelectContainer} />
                <Route path="/add-toppings" component={AddToppings} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/flavors" component={Flavors} />
                <Route exact path="/profile" component={Profile} />
              </Switch>
            )}
            {/* Displays our Login component as a fallback */}
            <Route component={Home} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me()),
  getCart: id => dispatch(getCart(id)),
  getProducts: () => dispatch(getProducts())
})

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
