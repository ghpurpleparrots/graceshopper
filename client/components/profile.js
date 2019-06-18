import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {updateUser} from '../store'
import {OrderHistory} from './index'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

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
  form: {
    width: '100%', // Fix IE 11 issue.
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
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    disabled: true
  })

  useEffect(() => {
    setState({
      name: user.name,
      email: user.email,
      address: user.address,
      city: user.city,
      state: user.state,
      zipCode: user.zipCode,
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
    if (event.target.name === 'zipCode') {
      setState({...state, zipCode: event.target.value})
    }
    if (event.target.name === 'city') {
      setState({...state, city: event.target.value})
    }
    if (event.target.name === 'state') {
      setState({...state, state: event.target.value})
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
  const {name, email, address, city, zipCode, phoneNumber, disabled} = state

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
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="city"
                  label="City"
                  type="city"
                  id="city"
                  autoComplete="city"
                  disabled={disabled}
                  value={city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="state"
                  label="State"
                  type="state"
                  id="state"
                  autoComplete="city"
                  disabled={disabled}
                  value={state.state}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="zipCode"
                  label="Zipcode"
                  type="zipCode"
                  id="zipCode"
                  autoComplete="zipCode"
                  disabled={disabled}
                  value={zipCode}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
      <OrderHistory />
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
