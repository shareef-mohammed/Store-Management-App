import React from 'react'
import CoWorkers from '../components/CoWorkers'
import Navbar from '../components/Navbar'

const CoWorkersPage = () => {
  return (
    <div>
        <Navbar home={true} />
        <CoWorkers />
    </div>
  )
}

export default CoWorkersPage