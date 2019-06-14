import React from 'react'
import {connect} from 'react-redux'
import {addToppings, getProducts, addToCart} from '../store'
import {green} from '@material-ui/core/colors'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Container from '@material-ui/core/Container'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import {Redirect} from 'react-router-dom'

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
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: 'purple',
    color: 'white'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
})

const GreenSwitch = withStyles({
  switchBase: {
    color: green[300],
    '&$checked': {
      color: green[500]
    },
    '&$checked + $track': {
      backgroundColor: green[500]
    }
  },
  checked: {},
  track: {}
})(Switch)

class AddToppings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentToppings: []
    }
    this.handleSelectTopping = this.handleSelectTopping.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCartAdd = this.handleCartAdd.bind(this)
  }

  handleSelectTopping(id) {
    let oldState = this.state.currentToppings
    if (!this.state.currentToppings.includes(id)) {
      oldState.push(id)
      this.setState({
        currentToppings: oldState
      })
    } else {
      let newState = oldState.filter(el => el !== id)
      this.setState({
        currentToppings: newState
      })
    }
  }

  handleSubmit() {
    this.props.addToOrder(this.state.currentToppings)
  }
  handleCartAdd() {
    this.props.addToOrder(
      this.state.currentToppings,
      this.props.cart.length + 1
    )
    this.props.addToCart()
    this.props.history.push('/start-order')
  }

  render() {
    const {classes} = this.props
    const containers = this.props.allProducts.filter(product => {
      return product.category === 'topping'
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
                  Choose Toppings ;)
                </Typography>
              </div>
              <div>
                <Container className={classes.cardGrid} maxWidth="md">
                  <Grid container spacing={4}>
                    {containers.map(card => (
                      <Grid item key={card.id} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                          <CardMedia
                            className={classes.cardMedia}
                            image={card.imageUrl}
                            title="Image title"
                          />
                          <CardContent className={classes.cardContent}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {card.name}
                            </Typography>
                          </CardContent>
                          <CardContent>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <GreenSwitch
                                    onChange={() =>
                                      this.handleSelectTopping(card.id)
                                    }
                                  />
                                }
                                label="Select"
                              />
                            </FormGroup>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              </div>
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => this.handleCartAdd()}
                >
                  Add To Cart
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allProducts: state.product,
  currentOrder: state.order.currentOrder,
  cart: state.order.cart
})
const mapDispatchToProps = dispatch => ({
  addToOrder: (toppings, groupId) => dispatch(addToppings(toppings, groupId)),
  getProducts: () => dispatch(getProducts()),
  addToCart: () => dispatch(addToCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AddToppings)
)