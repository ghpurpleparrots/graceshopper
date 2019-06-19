import React from 'react'
import {connect} from 'react-redux'
import {incrementQty, decrementQty, deleteItem, addToCartDB} from '../store'
import {makeStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import {flexbox} from '@material-ui/system'

const useStyles = makeStyles(theme => ({
  root: {
    width: '500px',
    padding: theme.spacing(4, 4, 4, 4)
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: 25,
    paddingTop: theme.spacing(8),
    margin: 25
  },
  button: {
    margin: theme.spacing(1)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  quantity: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3)
  },
  listItem: {
    padding: theme.spacing(1, 0)
  },
  container: {
    padding: theme.spacing(8),
    margin: theme.spacing(8)
  }
}))

const Cart = props => {
  const {cart, products, user, orderId} = props
  const classes = useStyles
  const total = cart.reduce((total, item) => (total += item.qty * 10), 0)

  React.useEffect(() => {
    if (cart.length) {
      props.addToCartDB(orderId, cart)
    }
  })

  return (
    <div className={classes.root}>
      <CssBaseline>
        <List>
          <ListItem>
            <ListItemText className={classes.title}>
              {user.id ? `${user.name}'s` : 'Guest'} Cart
            </ListItemText>
          </ListItem>
        </List>
        {/* <Divider /> */}
        <List>
          {cart.map((item, i) => (
            <div key={i}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src="icecream_icon.png" />
                </ListItemAvatar>
                <ListItemText>
                  <ul id="cart-list">
                    <li>
                      {products.filter(el => el.id === item.container)[0].name}
                    </li>
                    <li>
                      {products.filter(el => el.id === item.flavor)[0].name}
                    </li>
                    {item.toppings.map((topping, i) => (
                      <li key={i}>
                        {products.filter(el => el.id === topping)[0].name}
                      </li>
                    ))}
                  </ul>
                </ListItemText>
                <Button
                  onClick={() => props.incrementQty(item.groupId)}
                  className={classes.button}
                  color="primary"
                >
                  +
                </Button>
                <Box border={1} className={classes.quantity}>
                  {item.qty}
                </Box>
                <Button
                  onClick={() =>
                    item.qty > 1
                      ? props.decrementQty(item.groupId)
                      : props.deleteItem(item.groupId)
                  }
                  className={classes.button}
                  color="secondary"
                >
                  -
                </Button>

                <ListItemText>${10 * item.qty}.00</ListItemText>
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => {
                      props.deleteItem(item.groupId)
                    }}
                    edge="end"
                    aria-label="Delete"
                  >
                    <DeleteIcon className={classes.button} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="middle" />
            </div>
          ))}
          <ListItem>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1">${total}.00</Typography>
          </ListItem>
        </List>
        {/* <Divider /> */}
      </CssBaseline>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.order.cart,
  products: state.product,
  orderId: state.order.orderId
})

const mapDispatchToProps = dispatch => ({
  incrementQty: groupId => dispatch(incrementQty(groupId)),
  decrementQty: groupId => dispatch(decrementQty(groupId)),
  deleteItem: groupId => dispatch(deleteItem(groupId)),
  addToCartDB: (orderId, cart) => dispatch(addToCartDB(orderId, cart))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
