//final
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: 'purple',
    color: 'white'
  }
}))

export const UserHome = props => {
  const {name, cart, isLoggedIn} = props
  const classes = useStyles()

  return (
    <div className="home-component">
      <Grid
        container
        spacing={1}
        alignItems="center"
        justify="center"
        style={{minHeight: '100vh'}}
      >
        <Grid item />

        <Grid item>
          <Link to="/products">
            <Button variant="contained" className={classes.button}>
              See All Products
            </Button>
          </Link>
        </Grid>
        <Grid id="home-img-container" item>
          <img src="/companylogo.jpg" />
          <h3 className="img-text">Welcome, {name || 'Friend'}!</h3>
        </Grid>
        {isLoggedIn ? (
          <Grid item>
            <Link to="/start-order">
              <Button variant="contained" className={classes.button}>
                {cart.length ? 'Add To Order' : 'Start Order'}
              </Button>
            </Link>
          </Grid>
        ) : (
          <Grid item>
            <Link to="/login">
              <Button variant="contained" className={classes.button}>
                Start Order
              </Button>
            </Link>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    name: state.user.name,
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    cart: state.order.cart
  }
}

export default connect(mapStateToProps)(UserHome)
