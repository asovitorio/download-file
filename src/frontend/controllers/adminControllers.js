
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
        const {page=1,id} = req.query
     const response = await fetch(`${process.env.URL_BASE}/path-files/report/${id}?page=${page}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
     const respClient= await fetch(`${process.env.URL_BASE}/client/${id}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
    const client = await respClient.json()
        console.log(client)
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
            clientActive:"active",
            reportActive:"",
            configActive:"",
            company:client.company,
            id:client.id,
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
                 if(data.status){

                     req.session.erro = true
                    return res.redirect('/add-clients')
               }
              
              res.redirect('/home')
                
            } catch (error) {
               
                
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
        // Busca o cliente pelo ID
        const response = await fetch(`${process.env.URL_BASE}/client/${req.body.id}`, {
            method: 'get',
            // body:JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json()
        // Busca o user_client pelo ID
        const resp_user = await fetch(`${process.env.URL_BASE}/search/user?client_id=${data.id}&page=1`, {
            method: 'get',
            // body:JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
        })
        const {users} = await resp_user.json()
       
        req.session.create = false
        return res.render('home', {
            title: "System",
            clientActive:"active",
            reportActive:"",
            configActive:"",
            linkPage:"/home",
            teste:'view',
            user,
            users,
            update:true,
            clients:data,
            totalPages:0,
            page:0,
            erro: req.session.erro != undefined ? true:false,
            format
        })

    },
    reportsFile: async (req, res) =>{
        const user = await jwt.verify(req.session.token,passJwt)

        const response = await fetch(`${process.env.URL_BASE}/reports`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })
        const reports = await response.json()
            const {client_id} = req.params
          
        return res.render('home', {
            title: "System",
            clientActive:"active",
            reportActive:"",
            configActive:"",
            linkPage:"/home",
            teste:'file',
            user,
            client_id,
            reports,
            msg: req.session.create?true:false,
            totalPages:0,
            page:0,
            format
        })
    },
    reportsFileSave: async (req,res) =>{
        console.log(req.files)
        const [{filename}] = req.files
        
        const{date,client_id,report_id} = req.body
        const reportFile = {
            date,
            path:filename,
            download:0,
            status:1,
            client_id,
            report_id
        }
        const resp_user = await fetch(`${process.env.URL_BASE}/client-reports`, {
            method: 'post',
            body:JSON.stringify(reportFile),
            headers: { 'Content-Type': 'application/json' },
        })
        req.session.create = true
        return res.redirect(`/reports-file/${client_id}`)
    },
    logout: (req, res) =>{
        req.session.token = null
        res.redirect('/')
    }
}

module.exports = adminController