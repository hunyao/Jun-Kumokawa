var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression')
var zlib = require("zlib");
require("dotenv").config()

var router = express.Router();
var indexRouter = require('./routes/index');
var gitTreeRouter = require('./routes/apis/tree');
var gitBlobRouter = require('./routes/apis/blob');
var gitRepositoryRouter = require('./routes/apis/repository');
var gitTreesRouter = require('./routes/apis/trees');

var oauth2Router = require('./routes/oauth2');

var app = express();

app.use(compression({ level: zlib.Z_BEST_COMPRESSION }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../build')));

app.use('/api/trees', gitTreesRouter);
app.use('/api/tree', gitTreeRouter);
app.use('/api/blob', gitBlobRouter);
app.use('/api/repository', gitRepositoryRouter);
app.use('/oauth2', oauth2Router);
app.use('/', indexRouter);

module.exports = app;
