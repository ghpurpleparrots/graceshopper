import React from 'react'
import {connect} from 'react-redux'

import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
  root: {
    width: 'inherit'
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  quantity: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1)
  },
  total: {
    fontWeight: '700'
  },
  list: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between'
  }
}))

const OrderHistory = props => {
  const getTotal = order =>
    order.reduce((total, item) => (total += item.qty * 10), 0)
  const getQuantity = order =>
    order.reduce((total, item) => (total += item.qty), 0)
  const classes = useStyles

  return (
    <div className="component">
      <Typography variant="h3">Order History</Typography>
      <Divider />
      <Grid container>
        <Grid item className={classes.root}>
          <div className={classes.demo}>
            <List className={classes.list}>
              {props.completedOrders.map((order, i) => (
                <ListItem key={i}>
                  <ListItem>
                    <ListItemText primary="Number" />
                    <Typography variant="subtitle1">{i + 1}</Typography>
                  </ListItem>
                  <ListItemAvatar>
                    <Avatar
                      className={classes.avatar}
                      src="icecream_icon.png"
                    />
                  </ListItemAvatar>
                  <ListItem>
                    <ListItemText primary="Quantity Ordered" />
                    <Typography variant="subtitle1">
                      {getQuantity(order.orderInfo)}
                    </Typography>
                  </ListItem>

                  <ListItem>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1">
                      ${getTotal(order.orderInfo)}.00
                    </Typography>
                  </ListItem>
                  <Divider />
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  completedOrders: state.order.completedOrders,
  products: state.product
})

export default connect(mapStateToProps)(OrderHistory)
