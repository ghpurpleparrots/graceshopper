import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'
import {Cart} from '../components'

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: '700'
  },
  title: {
    marginTop: theme.spacing(2)
  }
}))

const Review = props => {
  const user = props.user
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
          <Typography gutterBottom>{user.id ? user.name : 'Guest'}</Typography>
          <Typography gutterBottom>
            {user.id ? user.address : '1 Main St'}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Review)
