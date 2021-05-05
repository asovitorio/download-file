var express = require('express');
var multer  = require('multer');
const path = require('path')
var router = express.Router();
const adminController = require('./controllers/adminControllers');
const loginController = require('./controllers/loginController');

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

router.get('/',loginController.index)
router.post('/',loginController.auth)
router.get('/time-line/',adminController.timeLine)
router.get('/time-line/:id/:pdf',adminController.donwload)
router.get('/home',adminController.home)
router.get('/logout',adminController.logout)
router.get('/clients',adminController.addClient)
router.post('/clients',adminController.saveClient)
router.put('/clients/:id',adminController.updateClient)
router.delete('/clients',adminController.deleteClient)
router.put('/clients',adminController.updateSaveClient)
router.get('/client-view/:id',adminController.viewClient)
router.get('/reports-file/:client_id',adminController.reportsFile)
router.post('/reports-file',upload.any(),adminController.reportsFileSave)



module.exports = router