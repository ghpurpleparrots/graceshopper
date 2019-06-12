import React from 'react'
import {connect} from 'react-redux'
import {addToOrder} from '../store'

import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  title: {
    padding: theme.spacing(3, 2)
  }
})

const StartOrder = props => {
  const {classes} = props
  const containers = props.allProducts.filter(product => {
    return product.category === 'container'
  })
  return (
    <div className="component">
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        alignContent="center"
        style={{minHeight: '100vh'}}
      >
        <Grid item xs={8}>
          <Paper className={classes.root}>
            <div>
              <Typography
                className={classes.title}
                align="center"
                variant="h3"
                component="h3"
              >
                Make Your Order.
              </Typography>
            </div>
            <div className={classes.cardContainer}>
              {containers.map(card => (
                <Grid item key={card.id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.imageUrl}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  allProducts: state.product,
  currentOrder: state.order.currentOrder
})
const mapDispatchToProps = dispatch => ({
  addToOrder: () => dispatch(addToOrder())
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(StartOrder)
)
