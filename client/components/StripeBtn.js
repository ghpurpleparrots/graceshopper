import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import Button from '@material-ui/core/Button'

const StripeBtn = props => {
  const publishableKey = 'pk_test_zeUVD7wJ1mOt0JVwm2ftX2fV00CCtghTqr'
  const total = parseInt(`${props.total}00`)

  const onToken = async token => {
    try {
      const body = {
        amount: total,
        token: token
      }
      const res = await axios.post('/api/payment', body)
      alert('Payment Success')
    } catch (err) {
      console.log('Payment Error:', err)
      alert('Payment Error')
    }
  }

  return (
    <StripeCheckout
      id="stripe-btn"
      className={props.style}
      label="Go to Payment"
      name="Purple Parrots Ice Cream"
      description="Enter Payment Info"
      panelLabel="Submit Payment"
      image="/companylogo.jpg"
      amount={total}
      token={onToken}
      stripeKey={publishableKey}
      billingAddress={false}
      closed={props.handleClose()}
    />
  )
}

export default StripeBtn
