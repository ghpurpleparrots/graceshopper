import React from 'react'
import {connect} from 'react-redux'
import {setShippingAddress} from '../store'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

class AddressForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phoneNumber: ''
    }
  }
  async componentDidMount() {
    const user = this.props.user
    if (user.id) {
      await this.setState({
        name: user.name,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zipCode,
        country: 'USA',
        phoneNumber: user.phoneNumber
      })
    }
  }
  componentWillUnmount() {
    this.props.setShipAddress({...this.state})
  }

  handleChange = event => {
    const oldState = this.state
    this.setState({...oldState, [event.target.name]: event.target.value})
  }
  render() {
    const user = this.props.user
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              name="name"
              label="Name"
              fullWidth
              onChange={this.handleChange}
              defaultValue={user.id ? user.name : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="address"
              label="Address"
              fullWidth
              onChange={this.handleChange}
              defaultValue={user.id ? user.address : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="city"
              label="City"
              fullWidth
              onChange={this.handleChange}
              defaultValue={user.id ? user.city : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="state"
              label="State/Province/Region"
              fullWidth
              onChange={this.handleChange}
              defaultValue={user.id ? user.state : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="zipCode"
              label="Zip / Postal code"
              fullWidth
              onChange={this.handleChange}
              defaultValue={user.id ? user.zipCode : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="country"
              label="Country"
              fullWidth
              onChange={this.handleChange}
              defaultValue="USA"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  setShipAddress: address => dispatch(setShippingAddress(address))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm)
