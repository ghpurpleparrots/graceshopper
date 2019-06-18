import React from 'react'
import {connect} from 'react-redux'
import {submitOrder} from '../store'
import {makeStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import {AddressForm, PaymentForm, Review} from '../components'
import {Elements, StripeProvider} from 'react-stripe-elements'

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingTop: theme.spacing(4),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}))

const steps = ['Shipping address', 'Payment details', 'Review your order']

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />
    case 1:
      return (
        <StripeProvider apiKey="pk_test_zeUVD7wJ1mOt0JVwm2ftX2fV00CCtghTqr">
          <Elements>
            <PaymentForm />
          </Elements>
        </StripeProvider>
      )
    case 2:
      return <Review />
    default:
      throw new Error('Unknown step')
  }
}

function Checkout(props) {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const total = props.cart.reduce((total, item) => (total += item.qty * 10), 0)

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleSubmit = () => {
    handleNext()
    props.submitOrder(props.orderId, props.cart, total)
    localStorage.removeItem('cart')
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is {props.orderId}. We have emailed your
                  order confirmation, and will send you an update when your
                  order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}

                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      color="primary"
                      className={classes.button}
                    >
                      Place Order
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {' '}
                      Next{' '}
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  cart: state.order.cart,
  orderId: state.order.orderId
})

const mapDispatchToProps = dispatch => ({
  submitOrder: (orderId, cart, price) =>
    dispatch(submitOrder(orderId, cart, price))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
