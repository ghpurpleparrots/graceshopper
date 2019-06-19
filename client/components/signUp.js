import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import axios from 'axios'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
})

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      address: '',
      phoneNumber: '',
      hasError: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    ValidatorForm.addValidationRule('isZip', value => {
      if (value.length === 5) {
        return true
      }
      return false
    })
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    let body = {...this.state}
    delete body.hasError

    try {
      await axios.post('/auth/signup', body)
      this.setState({
        name: '',
        email: '',
        password: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: ''
      })
      this.props.history.push('/sign-up-confirm')
    } catch (error) {
      console.log(error)
      this.setState({
        hasError: true
      })
    }
  }

  render() {
    const {classes} = this.props
    const {
      name,
      email,
      password,
      address,
      phoneNumber,
      city,
      state,
      zipCode
    } = this.state
    return (
      <Container className="component" component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {this.state.hasError ? (
            <Typography color="error" component="h1" variant="h6">
              Error signing up, could be:{' '}
            </Typography>
          ) : (
            <div />
          )}
          <ValidatorForm className={classes.form} onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={email}
                  validators={['required', 'isEmail']}
                  errorMessages={[
                    'this field is required',
                    'please enter a valid e-mail'
                  ]}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Address"
                  name="address"
                  value={address}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="City"
                  name="city"
                  value={city}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="State"
                  name="state"
                  value={state}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  variant="outlined"
                  required
                  fullWidth
                  label="Zipcode"
                  name="zipCode"
                  value={zipCode}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>

            <Grid container justify="flex-end" />
          </ValidatorForm>
        </div>
      </Container>
    )
  }
}

export default withStyles(styles)(SignUp)
