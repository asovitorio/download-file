var express = require('express');
var router = express.Router();
const userController = require('./controllers/userController')
const clientsController = require('./controllers/clientsController')
const reportsController = require('./controllers/reportsController')
const pathFilesController = require('./controllers/pathFilesController')
const authJwtController = require('./controllers/authJwtController')

/* GET home page. */

//  return res.json({url:`http://localhost:3000/uploads/teste.pdf`})
// ### Rotas User #####
router.get('/user',userController.index)
router.post('/user',userController.create)
router.get('/user/:id',userController.showId)
router.get('/search/user',userController.showParams)
router.put('/user',userController.update)
router.delete('/user',userController.delete)

// Rptas Authentications whit return jwt
router.post('/auth',authJwtController.auth)

// ### Rotas Cliente #####
router.get('/client',clientsController.index)
router.get('/client/:id',clientsController.showId)
router.get('/search/client',clientsController.showParams)
router.post('/client',clientsController.create)
router.put('/client',clientsController.update)
router.delete('/client',clientsController.delete)

// ### Rotas Tipo de Relatorio #####
router.get('/reports',reportsController.index)
router.post('/reports',reportsController.create)
router.put('/reports',reportsController.update)
router.delete('/reports',reportsController.delete)

// ### Rotas Tipo de Relatorio #####
router.get('/client-reports',pathFilesController.index)
router.get('/path-files',pathFilesController.showClientReports)
router.get('/path-files/:id',pathFilesController.showClientReortId)
router.get('/path-files/report/:id',pathFilesController.showReportId)
router.post('/client-reports',pathFilesController.create)
router.put('/path-files',pathFilesController.update)

module.exports = router;
