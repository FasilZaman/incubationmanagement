var express = require('express');
var router = express.Router();
var adminhelper = require('../Helpers/adminHelpers')
var jwt = require('jsonwebtoken')

const jwtsecret = process.env.JWT_SECRET

const checktoken=(req,res,next) =>{
  console.log("hello");
  console.log(req.headers);
  let token = req.headers.authorization
  console.log("sdsdsdsdsd",req.headers.authorization);
  console.log(token);
  if(token){
    let auth = jwt.verify(token,process.env.JWT_SECRET)
    if(auth){
      console.log('success');
      next()
    }else{
      res.status(400).json({err:'authentication error'})
    }
  }
}

/* GET home page. */
router.post('/adminlogin',(req,res)=>{
  try{
    console.table(req.body);
    const {email , password} = req.body
    if ( !email || !password) {
      res.status(400).json({ err: 'Enter all the details' })
    }else{
      adminhelper.doAdminLogin(req.body).then((response)=>{
        if(response.loggedIn){
          const token = jwt.sign({email:email,id:response.admin.id},jwtsecret)
          response.admin.token = token
          data = response.admin
          console.log('details : ',data);
          res.status(200).json(data)
        }else{
          res.status(400).json({ err : "invalid username or password"})
        }
      })
    }
  }catch(error){
    console.log(error)
  }
})

router.get('/newapplication', (req,res)=>{
  try{
    adminhelper.getNewApplication().then((formData)=>{
      // console.log("allmanyData:",formData);
      let response = {}
      let newApplication = []
      let pendingApplication = []
      let confirmedApplication = []
      

      for (i of formData){

        if(!i.status){
          newApplication.push(i)
          
        }else{
          if(i.status === 'pending'){
            pendingApplication.push(i)
          }else{
            confirmedApplication.push(i)
          }
        }
      }
      response.all = formData
      response.new = newApplication
      // console.log("New application is",response.new);
      response.pending = pendingApplication
      response.confirmed = confirmedApplication
      // console.log('qwwqqwqwqwqwqwqqqqqqqqqqqwwwwwwwwwwwwwwwwwwwwwwwwwwww',response.confirmed);
            res.status(200).json(response)
    })
  }catch(err){
    console.log(err);
  }
})

router.post('/pending', checktoken ,(req,res)=>{
  // console.log("asasas",req.body);
  id=req.body._id
  console.log("ewewewe",id);
  adminhelper.pending(id).then((response)=>{
    res.status(200).json(response)
  })
})

router.post('/approve',(req,res)=>{
  console.log("asasas",req.body);
  id=req.body._id
  console.log("ewewewe",id);
  adminhelper.approve(id).then((response)=>{
    res.status(200).json(response)
  })
})

router.get('/getslots' ,(req,res)=>{
  try{
    adminhelper.getAllslots().then((slots)=>{
      let response={}
      let slotA=[]
      let slotB=[]
      let slotC=[]
      let slotD=[]
      let slotE=[]

      for (i of slots){
        if(i.section === 'A'){
          slotA.push(i)
        }else if(i.section === 'B'){
          slotB.push(i)
        }else if(i.section === 'C'){
          slotC.push(i)
        }else if(i.section === 'D'){
          slotD.push(i)
        }else{
          slotE.push(i)
        }
      }
      
      response.A = slotA
      response.B = slotB
      response.C = slotC
      response.D = slotD
      response.E = slotE

      res.status(200).json(response)
    })
  }catch(err){
    console.log(err);
  }


})

router.post('/select',(req,res)=>{
  console.log("asasas",req.body);
  id=req.body._id
  companyid = req.body.company
  console.log("ewewewe",id);
  adminhelper.bookSlot(id).then((response)=>{
    adminhelper.bookcompany(companyid).then((response)=>{   
      res.status(200).json(response)
    })
  })
})

module.exports = router;
