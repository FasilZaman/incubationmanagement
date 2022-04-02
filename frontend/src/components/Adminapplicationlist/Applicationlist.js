import React ,{useState,useEffect} from 'react'
import './Applicationlist.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material'
import axios from 'axios';
import {serverURL} from '../../constants/Constants'
import api from '../../constants/axios'


function Applicationlist() {

    const [newApplication , setNewApplication ] = useState([])
    const [pendingApplication , setPendingApplication] = useState([])


    const makePending = (id) =>{
        const dataid = {_id:id}
       api.post(`/admin/pending`,dataid).then((res)=>{
        axios.get(`${serverURL}/admin/newapplication`).then((response)=>{
            console.log(response.data.new)
            setNewApplication(response.data.new)
            console.log(response.data.pending);
            setPendingApplication(response.data.pending)
            
        }).catch((err)=>{
            console.log(err)
        })            
       }) 
    }

    const approve = (id) =>{
        const dataid = {_id:id}
       axios.post(`${serverURL}/admin/approve`,dataid).then((res)=>{
        axios.get(`${serverURL}/admin/newapplication`).then((response)=>{
            console.log(response.data.new)
            setNewApplication(response.data.new)
            console.log(response.data.pending);
            setPendingApplication(response.data.pending)
            
        }).catch((err)=>{
            console.log(err)
        })            
       }) 
    }


    

    useEffect(() => {
        
            try{
                axios.get(`${serverURL}/admin/newapplication`).then((response)=>{
                    console.log(response.data.new)
                    setNewApplication(response.data.new)
                    console.log(response.data.pending);
                    setPendingApplication(response.data.pending)
                    
                }).catch((err)=>{
                    console.log(err)
                })
    
            }catch(err){
                console.log(err)
            }
        
    }, [])
    

    return (
        <div className='main'>
            <h2 className='heading1' >New Applicant list</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead className='tablehead' >
                        <TableRow>
                            <TableCell style={{ color: 'white' }}>S.no </TableCell>
                            <TableCell style={{ color: 'white' }}>Company name</TableCell>
                            <TableCell style={{ color: 'white' }}>Company details</TableCell>
                            <TableCell style={{ color: 'white' }}></TableCell>
                            <TableCell style={{ color: 'white' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newApplication.map((data,index)=>(

                        
                          <TableRow >
                            <TableCell component="th" scope="row">
                                {parseInt(index) + 1}
                            </TableCell>
                            <TableCell >{data.companyname}</TableCell>
                            <TableCell >{data.address},{data.city},{data.state}</TableCell>
                            <TableCell >
                                <Button variant="outlined" color="success">
                                    open
                                </Button>
                            </TableCell>
                            <TableCell >
                                <Button variant="outlined" color="error" onClick={()=>{
                                    makePending(data._id)
                                }}>
                                    Pending
                                </Button>
                            </TableCell>
                        </TableRow>  ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <h2 className='heading2' >Pending Applicant list</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead className='tablehead' >
                        <TableRow>
                            <TableCell style={{ color: 'white' }}>S.no </TableCell>
                            <TableCell style={{ color: 'white' }}>Company name</TableCell>
                            <TableCell style={{ color: 'white' }}>Company details</TableCell>
                            <TableCell style={{ color: 'white' }}></TableCell>
                            <TableCell style={{ color: 'white' }}></TableCell>
                            <TableCell style={{ color: 'white' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    {pendingApplication.map((data,index)=>(

                        <TableRow >
                             <TableCell component="th" scope="row">
                                {parseInt(index) + 1}
                            </TableCell>
                            <TableCell >{data.companyname}</TableCell>
                            <TableCell >{data.address},{data.city},{data.state}</TableCell>
                            <TableCell >
                                <Button variant="contained" color="error">
                                    open
                                </Button>
                            </TableCell>
                            <TableCell >
                                <Button variant="outlined" onClick={()=>{
                                    approve(data._id)
                                }}>
                                    Approve
                                </Button>
                            </TableCell>
                            <TableCell >
                                <Button style={{backgroundColor:'#b8b8b8', color:'#ffffff'}}>
                                    decline
                                </Button>
                            </TableCell>
                        </TableRow> ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Applicationlist