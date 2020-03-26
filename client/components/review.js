//final
import React from 'react'
import {connect} from 'react-redux'
import {Cart} from '../components'

import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: theme.spacing(2)
  }
}))

const Review = props => {
  const {name, address, city, state, zipCode} = props.address
  const classes = useStyles()

  return (
    <React.Fragment>
      <List disablePadding>
        <Cart />
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{name}</Typography>
          <Typography gutterBottom>{address}</Typography>
          <Typography gutterBottom>{`${city}, ${state} ${zipCode}`}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  address: state.order.shippingAddress
})

export default connect(mapStateToProps)(Review)
