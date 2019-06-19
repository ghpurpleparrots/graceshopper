import React from 'react'
import {Footer, Navbar} from './components'
import Routes from './routes'

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
        <Footer />
      </div>
    )
  }
}

export default App
