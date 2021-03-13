const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const methodOverride = require('method-override')
const routesApi = require('./api/routes');
const routesAdmin = require('./frontend/routes');

const app = express();


app.set('views', path.join(__dirname,'frontend','views'));
app.set('view engine', 'ejs');
app.use(session({
  secret:"projetoExpressfile",
  resave:true,
  saveUninitialized:true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'api','service')));
app.use(express.static(path.join(__dirname,'frontend','public')));
app.use(methodOverride('_method'))
app.use(routesAdmin);
app.use('/api/v1', routesApi);

module.exports = app;
