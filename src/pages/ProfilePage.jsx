import React from 'react'
import Navbar from '../components/Navbar'
import Profile from '../components/Profile'

const ProfilePage = () => {
  return (
    <div>
        <Navbar />
        <Profile home={true} />
    </div>
  )
}

export default ProfilePage