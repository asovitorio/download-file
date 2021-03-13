var express = require('express');
var router = express.Router();
const adminController = require('./controllers/adminControllers');
const loginController = require('./controllers/loginController');

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
router.post('/client-view',adminController.viewClient)


module.exports = router