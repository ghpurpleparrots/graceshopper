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
import {incrementQty, decrementQty} from '../store/order'
import Box from '@material-ui/core/Box'

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
  }
}))
const Cart = props => {
  const {cart, products, user} = props
  const classes = useStyles

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
                    onClick={() => props.decrementQty(item.groupId)}
                    className={classes.button}
                    color="secondary"
                  >
                    -
                  </Button>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
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
  user: state.user,
  cart: state.order.cart,
  products: state.product
})

const mapDispatchToProps = dispatch => ({
  incrementQty: groupId => dispatch(incrementQty(groupId)),
  decrementQty: groupId => dispatch(decrementQty(groupId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
