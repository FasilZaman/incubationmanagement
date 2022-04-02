import React from 'react'
import Header from '../components/Adminheaders/Header/Header'
import Siderbar from '../components/Adminheaders/Sidebar/Siderbar'
import Recordtrack from '../components/Recordtrack/Recordtrack'

function Recordtrackpage() {
  return (
    <div>
        <Header />
        <div style={{display:"flex"}}>
            <Siderbar />
            <Recordtrack />
        </div>
    </div>
  )
}

export default Recordtrackpage