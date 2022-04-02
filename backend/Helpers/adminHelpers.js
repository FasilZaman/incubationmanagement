var db = require('../config/connections')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
const async = require('hbs/lib/async')
const { ObjectId } = require('mongodb')


module.exports = {
    doAdminLogin : (data) =>{
        return new Promise (async(resolve,reject)=>{
            let response = {}
            let admin = await db.get().collection(collection.ADMINCOLLECTION).findOne({email:data.email})
            if(admin){
                bcrypt.compare(data.password, admin.password).then((status) => {
                    if (status) {
                        console.log('loginSuccessfull');
                        response.loggedIn = true;
                        response.admin = admin
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
    getNewApplication : ()=>{
        return new Promise ( async(resolve,reject)=>{
           let formData = await db.get().collection(collection.FORMCOLLECTION).find().toArray()
        //    console.log("allData : ",formData);
           resolve(formData)
        })
    },
    pending : (id) => {
        return new Promise ( async(resolve,reject) => {
            console.log(id);
            db.get().collection(collection.FORMCOLLECTION).updateOne({_id:ObjectId(id)},{$set:{status:'pending'}}).then((response)=>{
                resolve(response)
            })
        })
    },
    approve : (id) => {
        return new Promise ( async(resolve,reject) => {
            console.log(id);
            db.get().collection(collection.FORMCOLLECTION).updateOne({_id:ObjectId(id)},{$set:{status:'approved'}}).then((response)=>{
                resolve(response)
            })
        })
    },
    getAllslots : () =>{
        return new Promise( async(resolve,reject) => {
            let slots = await db.get().collection(collection.SLOTCOLLECTION).find().toArray()
           console.log("allData : ",slots);
           resolve(slots)
        })
    },
    bookSlot : (id) =>{
        return new Promise ( async(resolve,reject) => {
            console.log(id);
            db.get().collection(collection.SLOTCOLLECTION).updateOne({_id:ObjectId(id)},{$set:{selected:true}}).then((response)=>{
                resolve(response)
            })
        }) 
    },
    bookcompany : (id) => {
        return new Promise ( async(resolve,reject) => {
            console.log(id);
            db.get().collection(collection.FORMCOLLECTION).updateOne({_id:ObjectId(id)},{$set:{selected:true}}).then((response)=>{
                resolve(response)
            })
        }) 
    }
}