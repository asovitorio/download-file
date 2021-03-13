const {User} = require('../models')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
require('dotenv').config()
const authJwtController = {
    auth: async (req, res) =>{
        const {user_name,password} = req.body;
        try {
         const user = await User.findOne({
                where: {user_name},
                    include:{
                      association:'client'
                    }});
            if(user_name===undefined || !user){
                return res.status(401).json({err:"user or password invalid!"})
            }        
            
            if(!bcryptjs.compareSync(password,user.password)){
                
                return res.status(401).json({err:"user or password invalid!"})
            }
            const userJwt = {
                id:user.id,
                name:user.name,
                user_name:user.user_name,
                client_id:user.client_id,
                status:user.status,
                company:user.client.company,
            } 
            const token = jwt.sign(userJwt,process.env.PASS_JWT,{expiresIn:"10h"}) 
            return res.status(200).json(token)
        } catch (error) {
            return res.status(400).json(error)
            
        }
    }

}

module.exports = authJwtController
