import { Paper, Button, Typography, Avatar, TextField } from '@mui/material';
import React, { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Adminloginstyle.css'
import { Lock } from '@material-ui/icons';
import axios from 'axios';
import { serverURL } from '../../constants/Constants'

const boxStyle = {
  width: 450,
  height: 600,
  margin: 'auto',
  mt: 5,
  flexWrap: 'wrap',
  pt: 5,
  padding: 6
}

function Adminlogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const data = {
    email,
    password
  }

  useEffect(() => {
    let admin=localStorage.getItem("adminData")
    if (admin){
      navigate('/applicationlist')
    }
  }, [])

  const login = () => {
    if (!email || !password) {
      setError('Enter all the details')
    } else {
      axios.post(`${serverURL}/admin/adminlogin`, data).then((response) => {
        console.log('admin login success');
        let admin = true
        let id = response.data._id
        let email = response.data.email
        let token = response.data.token

        const adminData = {
          admin,
          id,
          email,
          token
        }
        localStorage.setItem("adminData", JSON.stringify(adminData))
        navigate('/applicationlist')
        console.log(response);
      }).catch((err) => {
        console.log(err.response.data.err)
        if (err.response.data.err) {
          setError(err.response.data.err)
        }
      })
    }
  }
  return (
    <div>
      {/* <Box  >         */}

      <Paper sx={boxStyle} elevation={6} >
        <Avatar sx={{ mt: 3, bgcolor: 'secondary.main', margin: 'auto', }}>
          <Lock />
        </Avatar>
        <Typography variant='h4' align="center" margin="20px" ><b>
          Admin Login
        </b>
        </Typography>
        {error && <h5 style={{ color: 'red' }}>{error}</h5>}
        <TextField className='text'
          margin="normal"
          required
          fullWidth
          label="Email Address"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={login}
        >
          <h3> Sign In </h3>
        </Button>


      </Paper>
      {/* </Box>     
          */}
    </div>
  )
}

export default Adminlogin