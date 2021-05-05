const fetch = require('node-fetch');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const passJwt = process.env.PASS_JWT
const loginController = {
    index: (req, res) => {
        res.render("index", {
            title: "Login",
            erro: false
        })
    },
    auth: async (req, res) => {
        try {
            const data = await fetch(`${process.env.URL_BASE}/auth`, {
                method: 'post',
                body:    JSON.stringify(req.body),
                headers: { 'Content-Type': 'application/json' },
            })
            const token = await data.json()
            req.session.token = token
            const user = await jwt.verify(req.session.token,passJwt)
            
            if(user.status==1)  return res.redirect(`/home`)
            if(user.status==2)  return res.redirect(`/client-view/${user.client_id}`)
            if(user.status==3)  return res.redirect(`/time-line?id=${user.client_id}&page=1`)
            
        } catch (error) {
            req.session.erro = true
            return  res.render("index", {
                title: "Login",
                erro: true
            })
        }


    }
}

module.exports = loginController