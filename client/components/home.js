import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      justify="center"
      style={{minHeight: '100vh'}}
    >
      <Grid item />

      <Grid item>
        <h3>Welcome, {email}</h3>
        <img src="/companylogo.jpg" />
      </Grid>
    </Grid>

    // <React.Fragment>
    //   <CssBaseline />
    //   <Container maxWidth="sm">

    //   </Container>
    // </React.Fragment>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    name: state.user.name,
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
