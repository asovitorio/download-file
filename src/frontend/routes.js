var express = require('express');
var multer  = require('multer');
const path = require('path')
var router = express.Router();
const adminController = require('./controllers/adminControllers');
const loginController = require('./controllers/loginController');
const userControler = require('./controllers/userController')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('src','api','service','uploads'))
    },
    filename: function (req, file, cb) {
        console.log(file)
      cb(null,Date.now() + file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })
// Routes login/home
router.get('/',loginController.index)
router.post('/',loginController.auth)
router.get('/home',adminController.home)
router.get('/logout',adminController.logout)

// Routes Clients
router.get('/clients',adminController.addClient)
router.post('/clients',adminController.saveClient)
router.put('/clients/:id',adminController.updateClient)
router.delete('/clients',adminController.deleteClient)
router.put('/clients',adminController.updateSaveClient)
router.get('/client-view/:id',adminController.viewClient)

// Routes Users
router.get('/users',userControler.userFormCreate)

// routes Reports
router.get('/reports-file/:client_id',adminController.reportsFile)
router.post('/reports-file',upload.any(),adminController.reportsFileSave)
router.get('/time-line/',adminController.timeLine)
router.get('/time-line/:id/:pdf',adminController.donwload)



module.exports = router