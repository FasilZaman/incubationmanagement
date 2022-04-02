var db = require('../config/connections')
var collection = require('../config/collections')
const async = require('hbs/lib/async')
const bcrypt = require('bcrypt')
const { reject } = require('bcrypt/promises')



module.exports={
    doSignup: (data) => {
        return new Promise(async(resolve,reject)=>{
            let response = {}
            let user = await db.get().collection(collection.USERCOLLECTION).findOne({email:data.email})
            if(user){
                console.log(data.email);
                console.log('user already exist');
                response.signuperror = true;
                resolve(response)
            }else{
                data.password = await bcrypt.hash(data.password, 10)
                db.get().collection(collection.USERCOLLECTION).insertOne(data).then((response)=>{
                    response.signuperror = false;
                    resolve(response)
                })
            }
        })
    },
    doLogin: (data) =>{
        return new Promise(async(resolve,reject)=>{
            let response = {}
            let user = await db.get().collection(collection.USERCOLLECTION).findOne({email:data.email})
            if(user){
                bcrypt.compare(data.password, user.password).then((status) => {
                    if (status) {
                        console.log('loginSuccessfull');
                        response.loggedIn = true;
                        response.user = user;
                        resolve(response)
                    } else {
                        console.log("Login failed");
                        response.loggedIn = false;
                        resolve(response)


                    }

                })
            }else{
                response.loggedIn = false;
                resolve(response)
            }
        })
    },
    insertForm:(formData)=>{
        return new Promise((resolve,reject)=>{
            let response = {}
            db.get().collection(collection.FORMCOLLECTION).insertOne(formData).then((details)=>{
                response.id = details.insertedId
                resolve(response)
            })
        })
    }

}