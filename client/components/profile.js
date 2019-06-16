import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

const Profile = props => {
  const [state, setState] = useState({
    email: '',
    password: '',
    address: '',
    phoneNumber: ''
  })

  useEffect(() => {
    document.title = `You clicked  times`
  })

  console.log(props.user)
  return <div className="component">Hi</div>
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
