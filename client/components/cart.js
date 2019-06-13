import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import {incrementQty, decrementQty, deleteItem} from '../store/order'
import Box from '@material-ui/core/Box'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    width: '500px'
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
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
    padding: theme.spacing(1)
  },
  total: {
    fontWeight: '700'
  },
  listItem: {
    padding: theme.spacing(1, 0)
  }
}))
const Cart = props => {
  const {cart, products, user} = props
  const classes = useStyles
  const total = cart.reduce((total, item) => (total += item.qty * 10), 0)

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item className={classes.root}>
          <Typography variant="h6" className={classes.title}>
            {user.name}'s Cart
          </Typography>
          <div className={classes.demo}>
            <List>
              {cart.map((item, i) => (
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar
                      className={classes.avatar}
                      src="icecream_icon.png"
                    />
                  </ListItemAvatar>
                  {item.products.map((prod, i) => (
                    <ListItemText
                      key={i}
                      secondary={products.filter(el => el.id === prod)[0].name}
                    />
                  ))}
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
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              <ListItem>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1">${total}.00</Typography>
              </ListItem>
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.order.cart,
  products: state.product
})

const mapDispatchToProps = dispatch => ({
  incrementQty: groupId => dispatch(incrementQty(groupId)),
  decrementQty: groupId => dispatch(decrementQty(groupId)),
  deleteItem: groupId => dispatch(deleteItem(groupId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
