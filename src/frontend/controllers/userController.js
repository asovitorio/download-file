const fs = require('fs');
const path = require('path')
const format = require('date-fns').format
const jwt = require('jsonwebtoken')
const passJwt = process.env.PASS_JWT
const fetch = require('node-fetch');
require('dotenv').config()
const userController = {
    
    userFormCreate: async(req, res) => {

        const user = await jwt.verify(req.session.token,passJwt)
        
         console.log(user)
        return res.render('home', {
            title: "System",
            clientActive:"active",
            reportActive:"",
            configActive:"",
            linkPage:"/home",
            view:'createUser',
            update:false,
            user,
            totalPages:0,
            page:0,
            erro:false,
           
        })
   
      
    }
}

module.exports = userController