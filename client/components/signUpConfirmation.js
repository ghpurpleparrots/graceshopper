import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  title: {
    padding: theme.spacing(3, 2)
  }
}))

export default function signUpConfirmation() {
  const classes = useStyles()
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
                Welcome New User! Please log-in to proceed.
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
