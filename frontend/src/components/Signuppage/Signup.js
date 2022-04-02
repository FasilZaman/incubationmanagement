import { Paper,Button,Typography,Avatar,TextField,Grid } from '@mui/material';
import React,{useState} from 'react'
import './Signupstyle.css'
import { Lock } from '@material-ui/icons';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
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
  
  
  function Signup() {
    const navigate = useNavigate();
    const [userName,setUserName] =useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [confirmPassword,setConfirmPassword] = useState()
    const [error,setError] = useState()

    const data={
      userName,
      email,
      password
    }
    
    const Signup = ()=>{
      if(!userName||!email||!password||!confirmPassword){
          setError('Enter all the details')
      }else if(password.length<6){
        setError('Enter minimum 6 characters for password')
      }else if(password!==confirmPassword){
        setError('passwords should be equal')
      }else{
        axios.post(`${serverURL}/signup`,data).then((res)=>{
          console.log('signup success');
          navigate('/userhome')
          console.log(res);
        }).catch((err)=>{
          console.log(err)
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
            Signup
            </b>           
            </Typography>
            {error && <h5 style={{color:'red'}}>{error}</h5> }
            <TextField className='text'
                margin="normal"
                required
                fullWidth             
                label="User name"
                type="text"
                onChange={(e)=>{
                  setUserName(e.target.value)
                  // console.log(e.target.value)
                }}
              />
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
           
                onChange={(e)=>{
                  setPassword(e.target.value)
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
              
                onChange={(e)=>{
                  setConfirmPassword(e.target.value)
                }}               
              />
              <Grid item sx={{mt:3}}>
                  <h5 style={{color:'blue', cursor:'pointer'}}  onClick={()=>{navigate('/')}}>
                    {"Already have an account? Login"}
                  </h5>
                </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={Signup}
              >
               <h3> Sign Up </h3> 
              </Button>
            
  
          </Paper>   
          {/* </Box>     
            */}
      </div>
    )

}

export default Signup