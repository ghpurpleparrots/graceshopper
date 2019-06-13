import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import {getOrderId, getProducts} from '../store'

/**
 * COMPONENT
 */

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: 'purple',
    color: 'white'
  },
  input: {
    display: 'none'
  }
}))

export const UserHome = props => {
  const {email, userId, getOrderId, isLoggedIn} = props
  const classes = useStyles()

  return (
    <div className="component">
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
        <Grid item>
          <h3>Welcome, {email}</h3>
          <img src="/companylogo.jpg" />
        </Grid>
        {isLoggedIn ? (
          <Grid item>
            <Link to="/start-order">
              <Button
                onClick={() => getOrderId(userId)}
                variant="contained"
                className={classes.button}
              >
                Start Order
              </Button>
            </Link>
          </Grid>
        ) : (
          <Grid item>
            <Link to="/sign-up">
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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    name: state.user.name,
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => ({
  getOrderId: userId => dispatch(getOrderId(userId))
})

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
