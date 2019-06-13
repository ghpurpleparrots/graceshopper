import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ShoppingBasket from '@material-ui/icons/ShoppingBasket'
import DraftsIcon from '@material-ui/icons/Drafts'
import SendIcon from '@material-ui/icons/Send'
import AccountCircle from '@material-ui/icons/AccountCircle'
import IconButton from '@material-ui/core/IconButton'
import {Typography, TextField} from '@material-ui/core'
import Link from '@material-ui/core/Link'
import {auth, logout, logOut} from '../store'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    },
    padding: theme.spacing(2)
  }
}))(MenuItem)

const LoginMenu = props => {
  const {user, handleSubmit, logoutUser, logoutCart} = props
  const [anchorEl, setAnchorEl] = React.useState(null)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function handleLogout() {
    logoutUser()
    logoutCart()
  }

  return (
    <div>
      <IconButton
        edge="start"
        aria-label="Account of current user"
        aria-controls="login-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      {user.id ? (
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem>
            <ListItemIcon>
              <ShoppingBasket />
            </ListItemIcon>
            <ListItemText primary="Order History" />
          </StyledMenuItem>
          <StyledMenuItem>
            <Button
              type="submit"
              variant="outlined"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          </StyledMenuItem>
        </StyledMenu>
      ) : (
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <form onSubmit={handleSubmit}>
            <StyledMenuItem>
              <TextField variant="outlined" label="Email" name="email" />
            </StyledMenuItem>
            <StyledMenuItem>
              <TextField variant="outlined" label="Password" name="password" />
            </StyledMenuItem>
            <Link variant="body2">"Don't have an account? Sign Up"</Link>
            <StyledMenuItem>
              <Button type="submit" variant="outlined">
                Login
              </Button>
            </StyledMenuItem>
          </form>
        </StyledMenu>
      )}
    </div>
  )
}
const mapStateToProps = state => ({
  user: state.user,
  cart: state.order.cart
})

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logout()),
    logoutCart: () => dispatch(logOut()),
    handleSubmit: async event => {
      event.preventDefault()
      const email = event.target.email.value
      const password = event.target.password.value
      await dispatch(auth(email, password, 'login'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginMenu)
