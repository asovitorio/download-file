
const fs = require('fs');
const path = require('path')
const format = require('date-fns').format
const jwt = require('jsonwebtoken')
const passJwt = process.env.PASS_JWT
const fetch = require('node-fetch');
require('dotenv').config()

const adminController = {
    
    timeLine: async (req, res) => {
        
        const user = await jwt.verify(req.session.token,passJwt)
        const {page=1} = req.query

     const response = await fetch(`${process.env.URL_BASE}/path-files/report/${ user.client_id}?page=${page}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
   
        const {
            pathFiles,
            totalPages
        } = data
       
        return res.render('timeline', {
            title: "System",
            pathFiles,
            totalPages,
            page,
            user,
            linkPage:"/time-line",
            format
        })
    },
    donwload: async (req, res) => {

        const update = {
            id: req.params.id,
            date: "",
            path: "",
            download: 1,
            status: "",
            client_id: "",
            report_id: ""
        }
        const response = await fetch(`${process.env.URL_BASE}/path-files`, {
            method: 'put',
            body:JSON.stringify(update),
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json()
        console.log(data)
        const caminho = path.join('src', 'api', 'service', 'uploads', req.params.pdf)
        fs.readFile(caminho, function (err, data) {
            res.contentType("application/pdf");
            res.send(data);
          
        });
    },
    home:async (req, res) =>{
        const user = await jwt.verify(req.session.token,passJwt)
        const {page=1} = req.query
        const response = await fetch(`${process.env.URL_BASE}/client?page=${page}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json()
       
        
        const {
            clients,
            totalPages
        } = data

        req.session.erro = undefined
        return res.render('home', {
            title: "System",
            clients,
            totalPages,
            page,
            clientActive:"active",
            reportActive:"",
            configActive:"",
            linkPage:"/home",
            teste:'index',
            user,
            format
        })

    },
    addClient:async(req,res) =>{
        const user = await jwt.verify(req.session.token,passJwt)
       console.log(req.session.erro)
           
        return res.render('home', {
            title: "System",
            clientActive:"active",
            reportActive:"",
            configActive:"",
            linkPage:"/home",
            teste:'create',
            user,
            update:false,
            clients:{},
            totalPages:0,
            page:0,
            erro: req.session.erro != undefined ? true:false,
            format
        })

    },
    saveClient: async (req,res) =>{
      
        try {
            const response = await fetch(`${process.env.URL_BASE}/client`, {
                method: 'post',
                body:JSON.stringify(req.body),
                headers: { 'Content-Type': 'application/json' },
            })
            const data = await response.json()
            
          res.redirect('/home')
            
        } catch (error) {
            req.session.erro = true
           
            res.redirect('/add-clients')
        }
    },
    updateClient:async(req,res) =>{
        try {
          const user = await jwt.verify(req.session.token,passJwt)
        const response = await fetch(`${process.env.URL_BASE}/client/${req.params.id}`, {
            method: 'get',
            // body:JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json()
  
        return res.render('home', {
            title: "System",
            clientActive:"active",
            reportActive:"",
            configActive:"",
            linkPage:"/home",
            teste:'create',
            user,
            update:true,
            clients:data,
            totalPages:0,
            page:0,
            erro: req.session.erro != undefined ? true:false,
            format
        })
          
      } catch (error) {
          
      }

    },
    updateSaveClient: async (req,res) =>{
        try {
        const response = await fetch(`${process.env.URL_BASE}/client`, {
            method: 'put',
            body:JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json()
          res.redirect('/home')
            
        } catch (error) {
            req.session.erro = true
            res.redirect('/clients')
        }
    },
    deleteClient: async (req,res) =>{
        try {
        const response = await fetch(`${process.env.URL_BASE}/client`, {
            method: 'delete',
            body:JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json()
          res.redirect('/home')
        } catch (error) {
            req.session.erro = true
            res.redirect('/clients')
        }
    },
    viewClient: async (req, res) =>{
        const user = await jwt.verify(req.session.token,passJwt)
        const response = await fetch(`${process.env.URL_BASE}/client/${req.body.id}`, {
            method: 'get',
            // body:JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json()
     
        return res.render('home', {
            title: "System",
            clientActive:"active",
            reportActive:"",
            configActive:"",
            linkPage:"/home",
            teste:'view',
            user,
            update:true,
            clients:data,
            totalPages:0,
            page:0,
            erro: req.session.erro != undefined ? true:false,
            format
        })

    },
    logout: (req, res) =>{
        req.session.token = null
        res.redirect('/')
    }
}

module.exports = adminController