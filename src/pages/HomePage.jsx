import React from 'react'
import Navbar from '../components/Navbar'
import Home from '../components/Home'

const HomePage = () => {
  return (
    <div>
        <Navbar home={true} />
        <Home />
    </div>
  )
}

export default HomePage