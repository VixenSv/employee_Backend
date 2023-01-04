const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const UserModel = require('../models/user.model')

app.use(bodyParser.json())

const createUser = async (req, res) => {

    //check if the req body is empty
    if(req.body){

        console.log('Request Sucessfull creating user...')
        
        const userModel = new UserModel(req.body)
        
        //save category data to database
        userModel.save().then((response) => {

        res.json(response)

        }).catch(err => {
            res.status(500).send(err.message)
        })
    }
    

}

const viewAllUsers = async (req, res) => {

    //check if the req body is empty
    if(req.body){

        console.log('Request Sucessfull Getting all user details...')
        
        //save category data to database
        UserModel.find({}).then((response) => {

            console.log('Data sucessfully retrived from the mongo db!')

            res.status(200).send(response)

            console.log('Response sent!')

        }).catch(err => {
            res.status(500).send(err.message)
        })
    }
    
}

const getUserById = async (req,res) => {
    if(req.params && req.params.id){
        await UserModel.findById(req.params.id)
      
        .then(data => {
            res.status(200).send({ userModel: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }   
}

const updateUser = async ( req, res) =>{   
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: { Name: req.body.Name, Email: req.body.Email, Address:req.body.Address } },
      { upsert: true },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
}

const deletelUser= async (req, res) => {

    //check if the req body is empty
        const id = req.params.id
        console.log(id)
        
        //delete product data to database
        await UserModel.findByIdAndDelete(id).then((response) => {

            console.log('Data sucessfully deleted from the mongo db!')

            res.status(200).send(response)

            console.log('Response sent!')

        }).catch(err => {
            res.status(500).send(err.message)
        });
    
    
}

module.exports = { 
    createUser,
    viewAllUsers,
    getUserById,
    updateUser, 
    deletelUser
}
