import React from 'react'
import Adminbookingslots from '../components/Adminbookingslots/Adminbookingslots'
import Header from '../components/Adminheaders/Header/Header'
import Siderbar from '../components/Adminheaders/Sidebar/Siderbar'

function Adminbookingslotspage() {
  return (
    <div>
        <Header />
        <div style={{display:'flex'}}>
        <Siderbar />
        <Adminbookingslots />
        </div>
    </div>
  )
}

export default Adminbookingslotspage