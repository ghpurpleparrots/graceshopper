//final
import React from 'react'
import {Button, Icon} from '@material-ui/core'

const OauthLoginForm = props => {
  return (
    <form method="get" action="/auth/google">
      <Button id="google-btn" type="submit" variant="outlined">
        <img id="google-icon" src="/icons8-color-48.png" />
        Login with Google
      </Button>
    </form>
  )
}

export default OauthLoginForm
