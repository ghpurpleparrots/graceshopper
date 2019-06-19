import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getOrderId, addContainer, getGuestOrderId} from '../store'

import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
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
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  itemName: {
    marginTop: '5px'
  }
})

class SelectContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentContainer: null
    }
    this.handleSelectContainer = this.handleSelectContainer.bind(this)
    this.handleRadioClick = this.handleRadioClick.bind(this)
  }
  async componentDidMount() {
    if (!this.props.userId && !this.props.orderId) {
      await this.props.getGuestOrderId()
    }
    if (!this.props.orderId) {
      await this.props.getOrderId(this.props.userId)
    }
  }

  handleRadioClick(cardId) {
    let thisCard = document.getElementById(cardId)
    let radio = thisCard.getElementsByTagName('input')[0]
    radio.click()
  }

  handleSelectContainer(id) {
    this.setState({
      currentContainer: id
    })
  }

  render() {
    const {classes} = this.props
    const containers = this.props.allProducts.filter(product => {
      return product.category === 'container'
    })
    return (
      <div>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          alignContent="center"
          style={{minHeight: '100vh'}}
        >
          <Grid item xs={8} className={classes.root}>
            <Paper className={classes.paper}>
              <div>
                <Typography
                  className={classes.title}
                  align="center"
                  variant="h3"
                  component="h3"
                >
                  Cone or Cup?
                </Typography>
              </div>
              <div>
                <Container className={classes.cardGrid} maxWidth="md">
                  <Grid className={classes.cardContainer} container spacing={4}>
                    {containers.map(card => (
                      <Grid item key={card.id} xs={12} sm={6} md={4}>
                        <Card
                          id={card.id}
                          className={classes.card}
                          onClick={() => this.handleRadioClick(card.id)}
                        >
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
              <div className={classes.buttons}>
                {this.state.currentContainer ? (
                  <Link
                    to={{
                      pathname: '/flavors',
                      fromContainer: true
                    }}
                  >
                    <Button
                      disabled={!this.state.currentContainer}
                      variant="contained"
                      className={classes.button}
                      onClick={() =>
                        this.props.addContainer(this.state.currentContainer)
                      }
                    >
                      Next
                    </Button>
                  </Link>
                ) : (
                  <Button
                    disabled={!this.state.currentContainer}
                    variant="contained"
                    className={classes.button}
                    onClick={() =>
                      this.props.addContainer(this.state.currentContainer)
                    }
                  >
                    Next
                  </Button>
                )}
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
  currentItem: state.order.currentItem,
  userId: state.user.id,
  orderId: state.order.orderId
})
const mapDispatchToProps = dispatch => ({
  addContainer: container => dispatch(addContainer(container)),
  getOrderId: userId => dispatch(getOrderId(userId)),
  getGuestOrderId: () => dispatch(getGuestOrderId())
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(SelectContainer)
)
