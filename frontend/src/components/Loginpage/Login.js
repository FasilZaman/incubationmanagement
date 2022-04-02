import { Paper,Button,Typography,Avatar,TextField,Grid } from '@mui/material';
import React,{useState,useEffect} from 'react'
import './Loginstyle.css'
import { Lock } from '@material-ui/icons';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {serverURL} from '../../constants/Constants'

const boxStyle={
    width: 450,
    height: 600,
    margin: 'auto',
    mt:5,
    flexWrap:'wrap',
    pt:5,
    padding:6
  }

function Login() {
  const navigate = useNavigate();
  const [email ,setEmail] = useState();
  const [password,setPassword] = useState();
  const [error,setError] = useState();
  const data = {
    email,
    password
  }
  useEffect(() => {
    let user=localStorage.getItem("userData")
    if (user){
      navigate('/userhome')
    }
  }, [])
  
  const login = ()=>{
    if(!email||!password){
      setError('Enter all the details')
  }else{
    axios.post(`${serverURL}/login`,data).then((response)=>{
      console.log('login success');
      let user=true
      let id = response.data._id
      let email = response.data.email

      const userData={
        user,
        id,
        email
      }
      localStorage.setItem("userData",JSON.stringify(userData))
      navigate('/userhome')
      // console.log(response);
    }).catch((err)=>{
      console.log(err.response.data.err)
          if(err.response.data.err){
            setError(err.response.data.err)
          }
    })
  }

  }
  return (
    <div>
        {/* <Box  >         */}
        
        <Paper sx={boxStyle}  elevation={6} >
          <Avatar  sx={{ mt:3,bgcolor: 'secondary.main', margin:'auto', }}>
            <Lock />
          </Avatar>
          <Typography variant='h4' align="center" margin="20px" ><b>
          Login
          </b>           
          </Typography>
          {error && <h5 style={{color:'red'}}>{error}</h5> }
          <TextField className='text'
              margin="normal"
              required
              fullWidth             
              label="Email Address"
              type="email"
              onChange={(e)=>{
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
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
            />
            <Grid item sx={{mt:3}}>
                <h5 style={{color:'blue', cursor:'pointer'}}  onClick={()=>{navigate('/signup')}}>
                  {"Don't have an account? Sign Up"}
                </h5>
              </Grid>
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

export default Login