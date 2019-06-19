import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import {Link} from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import {auth} from '../store'
import {connect} from 'react-redux'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import OauthLoginForm from './oath-login-form'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1422246478030-ac94dfdc1dae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    paddingTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  guest: {
    backgroundColor: 'purple',
    color: 'white',
    margin: theme.spacing(1)
  }
}))

function LoginPage(props) {
  const classes = useStyles()

  const [state, setState] = React.useState({
    email: '',
    password: ''
  })

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
    props.login(email, password)
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in to Continue
          </Typography>
          <ValidatorForm
            onSubmit={handleSubmit}
            className={classes.form}
            noValidate
          >
            <TextValidator
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              onChange={handleChange}
              value={state.email}
              name="email"
              validators={['required', 'isEmail']}
              errorMessages={[
                'this field is required',
                'please enter a valid e-mail'
              ]}
              autoFocus
            />
            <TextValidator
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={handleChange}
              value={state.password}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/sign-up">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </ValidatorForm>
          <Link to="/start-order">
            <Button fullWidth variant="contained" className={classes.guest}>
              Continue As Guest
            </Button>
          </Link>
          <OauthLoginForm />
        </div>
      </Grid>
    </Grid>
  )
}

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(auth(email, password, 'login'))
})

export default connect(null, mapDispatchToProps)(LoginPage)
