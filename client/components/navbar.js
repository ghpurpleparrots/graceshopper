//final
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProducts} from '../store'
import LoginMenu from './loginMenu'
import {Cart} from '../components'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import ShoppingCart from '@material-ui/icons/ShoppingCartOutlined'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  appbar: {
    backgroundColor: 'purple',
    minHeight: '85px',
    maxHeight: '10vw'
  },
  title: {
    display: 'center',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    color: 'white'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '85px'
  },
  logo: {
    maxHeight: '7vw'
  },
  button: {
    color: 'white',
    backgroundColor: 'purple'
  },
  buttons: {
    width: '300px',
    margin: theme.spacing(2, 0, 2, 2)
  }
}))

const Navbar = props => {
  const {cart} = props
  const classes = useStyles()

  const [state, setState] = React.useState({
    right: false
  })

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({...state, [side]: open})
  }
  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <LoginMenu />
          <Link to="/">
            <img
              src="/purpleparrotlogo.jpg"
              height="10%"
              className={classes.logo}
            />
          </Link>
          <div>
            <IconButton aria-label="new notifications" color="inherit">
              <Badge
                badgeContent={cart.length ? cart.length : ''}
                color="secondary"
                invisible={!cart.length}
              >
                <ShoppingCart
                  className="icon"
                  onClick={toggleDrawer('right', true)}
                />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
      >
        <Cart />
        <div className={classes.buttons}>
          <Link to="/checkout">
            <Button
              variant="contained"
              className={classes.button}
              onClick={toggleDrawer('right', false)}
            >
              Checkout
            </Button>
          </Link>
        </div>
      </Drawer>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.order.cart
  }
}

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(getProducts())
})

export default connect(mapState, mapDispatch)(Navbar)
