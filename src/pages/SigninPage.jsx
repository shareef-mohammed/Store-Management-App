import React from 'react'
import SignIn from '../components/SignIn'
import Navbar from '../components/Navbar'

const SigninPage = () => {
  return (
    <div className='w-full '>
      <Navbar signin={true} />
      <SignIn />
    </div>
  )
}

export default SigninPage