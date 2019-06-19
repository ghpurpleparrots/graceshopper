//final
import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '25vh'
  },

  footer: {
    position: 'fixed',
    padding: theme.spacing(0.5),
    marginTop: 'auto',
    backgroundColor: 'purple',
    width: '100%',
    bottom: 0
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    // height: 25
  },
  text: {
    fontSize: '.7rem'
  }
}))

export default function Footer() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container className={classes.container} maxWidth="sm">
          <Typography className={classes.text}>
            © 2019 Purple Parrots
          </Typography>
          <div className={classes.buttons}>
            <IconButton>
              <img className={classes.icon} src="/facebook.png" />
            </IconButton>
            <IconButton>
              <img className={classes.icon} src="/twitter.png" />
            </IconButton>
            <IconButton>
              <img className={classes.icon} src="/instagram.png" />
            </IconButton>
          </div>
        </Container>
      </footer>
    </div>
  )
}
