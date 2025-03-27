import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Dashbard from './Dashbard'
import DbFooter from './DbFooter'
import HeaderDashboard from './HeaderDashboard'

const Panel = () => {

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className='p-4 xl:ml-80'>
        <HeaderDashboard />
        <Dashbard />
        <DbFooter />
      </div>
    </div>
  )
}

export default Panel
