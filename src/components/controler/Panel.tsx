import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import HeaderDashboard from './HeaderDashboard'

const Panel = () => {

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <HeaderDashboard />
    </div>
  )
}

export default Panel
