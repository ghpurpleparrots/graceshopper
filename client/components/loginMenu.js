import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import ShoppingBasket from '@material-ui/icons/ShoppingBasket'
import AccountCircle from '@material-ui/icons/AccountCircle'
import {
  Typography,
  Menu,
  Button,
  IconButton,
  ListItemText,
  ListItemIcon,
  MenuItem
} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {auth, logout, logOut} from '../store'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

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
  const {user, login, logoutUser, logoutCart} = props
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [state, setState] = React.useState({
    email: '',
    password: ''
  })

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }
  function handleChange(event) {
    if (event.target.name === 'email') {
      setState({...state, email: event.target.value})
    }
    if (event.target.name === 'password') {
      setState({...state, password: event.target.value})
    }
  }
  function handleSubmit(event) {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    setState({email: '', password: ''})
    login(email, password)
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
          <ValidatorForm
            onSubmit={handleSubmit}
            onError={errors => console.log(errors)}
          >
            <StyledMenuItem>
              <TextValidator
                variant="outlined"
                label="Email"
                onChange={handleChange}
                name="email"
                value={state.email}
                validators={['required', 'isEmail']}
                errorMessages={[
                  'this field is required',
                  'please enter a valid e-mail'
                ]}
              />
            </StyledMenuItem>
            <StyledMenuItem>
              <TextValidator
                variant="outlined"
                label="Password"
                type="password"
                onChange={handleChange}
                name="password"
                value={state.password}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </StyledMenuItem>
            <Link to="/sign-up">
              <Typography align="center" variant="caption" component="p">
                Don't have an account? Sign Up
              </Typography>
            </Link>
            <StyledMenuItem>
              <Button type="submit" variant="outlined">
                Login
              </Button>
            </StyledMenuItem>
          </ValidatorForm>
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
    login: (email, password) => dispatch(auth(email, password, 'login'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginMenu)
