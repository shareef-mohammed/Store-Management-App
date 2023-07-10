import React from 'react'
import Navbar from '../components/Navbar'
import DashboardContent from '../components/DashboardContent'

const Dashboard = () => {
  return (
    <div>
        <Navbar dashboard={true} />
        <DashboardContent />
    </div>
  )
}

export default Dashboard