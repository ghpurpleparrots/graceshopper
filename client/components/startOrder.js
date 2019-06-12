import React from 'react'
import {connect} from 'react-redux'
import {addToppings} from '../store'
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

class StartOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentToppings: []
    }
    this.handleSelectTopping = this.handleSelectTopping.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSelectTopping(event) {}

  handleSubmit(event) {}

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
                                  // checked={state.checkedA}
                                  // onChange={this.handleSelectTopping(evt)}
                                  // name={card.name}
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
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allProducts: state.product,
  currentOrder: state.order.currentOrder
})
const mapDispatchToProps = dispatch => ({
  addToOrder: () => dispatch(addToppings())
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(StartOrder)
)
