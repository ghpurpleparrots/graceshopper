import React from 'react'
import {Button} from '@material-ui/core'

const OauthLoginForm = props => {
  return (
    <form method="get" action="/auth/google">
      <Button type="submit" variant="outlined">
        Login with Google
      </Button>
    </form>
  )
}

export default OauthLoginForm
