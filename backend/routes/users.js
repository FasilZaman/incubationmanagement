var express = require('express');
var router = express.Router();
const userhelper = require('../Helpers/userHelper')
const multer = require('multer')
let fs = require('fs');
const path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    cb(null, 'companyLogo.jpg')
  }
})
let upload = multer({ storage: storage }).single('logo')

/* GET users listing. */


router.get('/', function (req, res, next) {

  res.send('server   gfsagsfasfahgfsas')
});

router.post('/signup', function (req, res, next) {
  try {
    console.log("gfgfgfgfgfgf");
    console.table(req.body)
    const { userName, email, password } = req.body
    if (!userName || !email || !password) {
      res.status(400).json({ err: 'Enter all the details' })
    } else if (password.length < 6) {
      res.status(400).json({ err: 'Enter minimum 6 characters for password' })
    } else {
      userhelper.doSignup(req.body).then((response) => {
        if (response.signuperror) {
          res.status(400).json({ err: 'user already exist' })
        } else {
          res.status(200).json({ success: 'success' })
        }
      })
    }
  } catch (error) {
    console.log("jhbvjhbjhbjhbhjb", error);
  }
});

router.post('/login', (req, res) => {
  try {
    console.table(req.body);
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).json({ err: 'Enter all the details' })
    } else {
      userhelper.doLogin(req.body).then((response) => {
        if (response.loggedIn) {
          res.status(200).json(response)
        } else {
          res.status(400).json({ err: "invalid username or password" })
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/formsubmit', (req, res) => {
  console.log("cbfvcvbcbv");
  try{

    upload(req, res, (err) => {
      // console.table(JSON.parse(req.body.data));
      let formData = JSON.parse(req.body.data)
      console.table(formData)
      userhelper.insertForm(formData).then((response) => {
        const currentPath = path.join(__dirname, "../public", "companyLogo.jpg");
        const destinationPath = path.join(__dirname, "../public/logoImages", response.id + ".jpg");
  
        fs.rename(currentPath, destinationPath, function (err) {
          if (err) {
            throw err
          } else {
            console.log("Successfully moved the file!");
          }
        });
        res.status(200).json({ success: 'form submitted successfully' })
      })
  
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ err: 'qwerty' })
      } else if (err) {
        return res.status(500).json({ err: 'asdfgh' })
      }
  
    })
  } catch (error){
    console.log(error)
  }
})



module.exports = router;
