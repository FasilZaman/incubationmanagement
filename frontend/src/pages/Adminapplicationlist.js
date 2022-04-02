import React from 'react'
import Applicationlist from '../components/Adminapplicationlist/Applicationlist'
import Header from '../components/Adminheaders/Header/Header'
import Siderbar from '../components/Adminheaders/Sidebar/Siderbar'

function Adminapplicationlist() {
  return (
    <div>
        <Header />
        <div style={{display:"flex"}}>
        <Siderbar />
        <Applicationlist />
        </div>
    </div>
  )
}

export default Adminapplicationlist