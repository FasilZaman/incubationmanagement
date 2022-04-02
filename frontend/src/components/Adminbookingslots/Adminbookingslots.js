import React, { useState, useEffect } from 'react'
import { Box, Paper, Divider, Modal, Typography,FormControl,InputLabel,MenuItem,Select,Button } from '@mui/material'
import './Adminbookingslots.css'
import axios from 'axios';
import { serverURL } from '../../constants/Constants'

function Adminbookingslots() {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [slotA, setSlotA] = useState([])
    const [slotB, setSlotB] = useState([])
    const [slotC, setSlotC] = useState([])
    const [slotD, setSlotD] = useState([])
    const [slotE, setSlotE] = useState([])
    const [company ,setCompany] = useState([])
    const [selectedCompany,setSelectedCompany] = useState('')
    const [slotId,setSlotid] = useState()
    const [errorMessage , setErrorMassage] = useState()
    const [refresh , setRefresh] = useState()

    const selectSlot = (id) => {
        if(selectedCompany === ''){
            console.log("qwertyuiop");
            setErrorMassage("select a company")
        }else{
            setErrorMassage('')
            const dataid = { 
                _id: slotId,
                company:selectedCompany
             }
            axios.post(`${serverURL}/admin/select`, dataid).then((res) => {
                console.log(res);
                setRefresh(res)
            })
        }
    }

    useEffect(() => {

        try {
            axios.get(`${serverURL}/admin/getslots`).then((response) => {
                console.log(response.data.A);
                setSlotA(response.data.A)
                setSlotB(response.data.B)
                setSlotC(response.data.C)
                setSlotD(response.data.D)
                setSlotE(response.data.E)
                axios.get(`${serverURL}/admin/newapplication`).then((response)=>{
                    console.log(response.data.confirmed)
                    setCompany(response.data.confirmed)                   
                }).catch((err)=>{
                    console.log(err)
                }) 



            }).catch((err) => {
                console.lo(err)
            })

        } catch (err) {
            console.log(err)
        }

    }, [refresh])

    return (
        <div className='main'>
            <div className='main2'>
                <Box className='box'
                    sx={{
                        display: 'flex', flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 2,
                            width: 90,
                            height: 90,
                            backgroundColor: '#d6ffc7'
                        }
                    }} >  {slotA.map((rows) => (
                        <Paper className='paper' style={{backgroundColor : rows.selected && '#416e31'  }} elevation={3} onClick={!rows.selected?()=>{
                            handleOpen()
                            setSlotid(rows._id)
                        }:''} />
                    ))}
                </Box>
                <hr className='hrline' />
                <hr className='hrline' />

                <div className='bottom' style={{ display: 'flex' }}>
                    <div className='boxdown1'>
                        <Box className='box'
                            sx={{
                                display: 'flex', flexWrap: 'wrap',
                                '& > :not(style)': {
                                    m: 2,
                                    width: 90,
                                    height: 90,
                                    backgroundColor: '#d6ffc7'
                                }
                            }} >
                            {slotB.map((rows) => (
                                <Paper className='paper' style={{backgroundColor : rows.selected && '#416e31'  }} elevation={3} onClick={!rows.selected?()=>{
                                    handleOpen()
                                    setSlotid(rows._id)
                                }:''} />
                            ))}
                        </Box>

                    </div>
                    <Divider className='divider' orientation="vertical" flexItem />
                    <div className='boxdown2'>
                        <Box className='box'
                            sx={{
                                display: 'flex', flexWrap: 'wrap',
                                '& > :not(style)': {
                                    m: 2,
                                    width: 90,
                                    height: 90,
                                    backgroundColor: '#d6ffc7'
                                }
                            }} >
                            {slotC.map((rows) => (
                                <Paper className='paper' style={{backgroundColor : rows.selected && '#416e31' }} elevation={3} onClick={!rows.selected?()=>{
                                    handleOpen()
                                    setSlotid(rows._id)
                                }:''} />
                            ))}
                        </Box>

                    </div>
                    <Divider className='divider' orientation="vertical" flexItem />
                    <div className='boxdown3'>
                        <Box className='box'
                            sx={{
                                display: 'flex', flexWrap: 'wrap',
                                '& > :not(style)': {
                                    m: 2,
                                    width: 90,
                                    height: 90,
                                    backgroundColor: '#d6ffc7'
                                }
                            }} >
                            {slotD.map((rows) => (
                                <Paper className='paper' style={{backgroundColor : rows.selected && '#416e31'  }} elevation={3} onClick={!rows.selected?()=>{
                                    handleOpen()
                                    setSlotid(rows._id)
                                }:''} />
                            ))}
                        </Box>

                    </div>
                    <Divider className='divider' orientation="vertical" flexItem />
                    <div className='boxdown4'>
                        <Box className='box'
                            sx={{
                                display: 'flex', flexWrap: 'wrap',
                                '& > :not(style)': {
                                    m: 2,
                                    width: 90,
                                    height: 90,
                                    backgroundColor: '#d6ffc7'
                                }
                            }} >
                            {slotE.map((rows) => (
                                <Paper className='paper' style={{backgroundColor : rows.selected && '#416e31'  }} elevation={3} onClick={!rows.selected?()=>{
                                    handleOpen()
                                    setSlotid(rows._id)
                                }:''} />
                            ))}
                        </Box>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Choose a company
                                </Typography>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">name</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selectedCompany}
                                            label="Company"
                                            onChange={(e) => setSelectedCompany(e.target.value)}
                                        >
                                            {company.map((data) => (

                                                <MenuItem value={data._id}>{!data.selected && data.companyname}</MenuItem>
                                            ))}

                                        </Select>
                                    </FormControl>
                                </Box>
                                {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : ""}
                                <Button variant="contained" sx={{ mt: 4, float: "right" }} onClick={()=>{
                                    handleClose()
                                    selectSlot()
                                    }}>Select</Button>

                            </Box>
                        </Modal>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Adminbookingslots