import React,{useState,useEffect} from 'react'
import {AppBar , Box , Toolbar , Typography , Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Userheader() {

    const navigate = useNavigate()

    const [logout,setlogout] =useState()

    const loggingout = () =>{
        localStorage.removeItem("userData")
        setlogout(true)
    }

    useEffect(() => {
        let user = localStorage.getItem("userData")
        if (!user) {
          navigate('/')
        } 
      }, [logout])
  return (
<Box sx={{ flexGrow: 1 }}>
    <AppBar className='heading' style={{backgroundColor: '#191821'}} position="static">
      <Toolbar >
        {/* <IconButton className='icon'
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          
        </Typography>
        <Button color="inherit" onClick={loggingout}>Logout</Button>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Userheader