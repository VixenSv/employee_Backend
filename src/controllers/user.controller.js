const express = require('express')
const router = express.Router()
const userService = require('../services/user.service')

module.exports = function(){

    
    router.post('/create-user',userService.createUser);
    router.get('/',userService.viewAllUsers);
    router.get('/:id',userService.getUserById);
    router.put('/edit/:id', userService.updateUser);
    router.delete('/delete/:id', userService.deletelUser);

 
    return router

}