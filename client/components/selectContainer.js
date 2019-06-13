import React from 'react'
import {connect} from 'react-redux'

import {Link} from 'react-router-dom'
import {addContainer} from '../store'

import {green} from '@material-ui/core/colors'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Container from '@material-ui/core/Container'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around'
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
    flexGrow: 0,
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    padding: theme.spacing(3, 2)
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: 'purple',
    color: 'white'
  },
  itemName: {
    marginTop: '5px'
  }
})

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />)

class selectContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentContainer: []
    }
    this.handleSelectContainer = this.handleSelectContainer.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSelectContainer(id) {
    this.setState({
      currentContainer: [id]
    })
  }

  handleSubmit(event) {}

  render() {
    const {classes} = this.props
    const containers = this.props.allProducts.filter(product => {
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
                  Choose Toppings ;)
                </Typography>
              </div>
              <div>
                <Container className={classes.cardGrid} maxWidth="md">
                  <Grid className={classes.cardContainer} container spacing={4}>
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
                              align="center"
                              variant="h5"
                              component="h2"
                              className={classes.itemName}
                            >
                              {card.name}
                            </Typography>
                            <input
                              type="radio"
                              onClick={() =>
                                this.handleSelectContainer(card.id)
                              }
                              value={card.id}
                              name="containers"
                            />
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              </div>
              <div>
                <Link to="/start-order">
                  <Button
                    onClick={() => getOrderId(userId)}
                    variant="contained"
                    className={classes.button}
                  >
                    Start Order
                  </Button>
                </Link>
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
  currentItem: state.order.currentItem
})
const mapDispatchToProps = dispatch => ({
  addContainer: container => dispatch(addContainer(container))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(selectContainer)
)
