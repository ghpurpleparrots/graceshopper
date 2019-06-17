import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {updateUser} from '../store'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    justifyContent: 'space-between'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(3, 0, 2)
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    margin: '10px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

const Profile = props => {
  const {user} = props
  const [state, setState] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    disabled: true
  })

  useEffect(() => {
    setState({
      name: user.name,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
      disabled: true
    })
  }, [])

  const enableEdit = () => {
    setState({
      ...state,
      disabled: false
    })
  }

  function handleChange(event) {
    if (event.target.name === 'name') {
      setState({...state, name: event.target.value})
    }
    if (event.target.name === 'email') {
      setState({...state, email: event.target.value})
    }
    if (event.target.name === 'address') {
      setState({...state, address: event.target.value})
    }
    if (event.target.name === 'phoneNumber') {
      setState({...state, phoneNumber: event.target.value})
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    let body = {...state}
    delete body.disabled

    props.updateUser(user.id, body)
    setState({...state, disabled: true})
  }

  const classes = useStyles()
  const {name, email, address, phoneNumber, disabled} = state

  console.log(state)

  return (
    <Container className="component" component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <div>
          <img src={user.imageUrl} />
        </div>
        <div> </div>
        <div className={classes.form}>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              disabled={disabled}
              value={name}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              disabled={disabled}
              value={email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="address"
              label="Address"
              type="address"
              id="address"
              autoComplete="address"
              disabled={disabled}
              value={address}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              type="phoneNumber"
              id="phoneNumber"
              autoComplete="phoneNumber"
              disabled={disabled}
              value={phoneNumber}
              onChange={handleChange}
            />
            <div className={classes.btnContainer}>
              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => enableEdit()}
              >
                Edit Your Profile
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={disabled}
              >
                Save Your Edits
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  updateUser: (userId, info) => dispatch(updateUser(userId, info))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
