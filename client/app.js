import React from 'react'
import store from './store'
import {me} from './store/user'
import {Navbar} from './components'
import Routes from './routes'

class App extends React.Component {
  componentDidMount() {
    store.dispatch(me())
  }
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

export default App
