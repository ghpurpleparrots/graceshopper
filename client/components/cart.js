import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FolderIcon from '@material-ui/icons/Folder'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(theme => ({
  root: {
    width: 400,
    flexGrow: 1
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  },
  avatar: {
    color: 'white'
  }
}))
const Cart = props => {
  const classes = useStyles
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Your Shopping Cart
          </Typography>
          <div className={classes.demo}>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.avatar} src="icecream_icon.png" />
                </ListItemAvatar>
                <ListItemText
                  primary="Single-line item"
                  secondary="Secondary text"
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="Delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

// mapDispatchToProps = dispatch => ({})

// mapStateToProps = state => ({})

// export default connect(mapStateToProps, mapDispatchToProps)(Cart)
export default Cart
