import React from 'react'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: '90px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  image: {
    backgroundImage:
      'url(https://cdn140.picsart.com/257404142016212.png?r1024x1024)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
}))

export default function NoMatch() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h4" align="center">
        Go Away
      </Typography>
      <img
        className="noMatchImg"
        src="https://cdn140.picsart.com/257404142016212.png?r1024x1024"
      />
    </div>
  )
}
