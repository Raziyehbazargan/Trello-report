'use strict';

// npm modules
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const Promise = require('bluebird');
const debug = require('debug')('Trello-Report:server');

// app modules
const authRouter = require('./route/auth-router.js');
const trelloRouter = require('./route/trello-router.js');
const errorMiddleware = require('./lib/error-middleware.js');

// load environment vars
dotenv.load();

// module constants
const PORT = process.env.PORT;
const app = express();

// app routes
//app.use(express.cookieParser('S3CRE7'));
app.use(express.static(`${__dirname}/build`));
app.use(session({secret: 'keyboard cat'}))

app.use(cors());
app.use(morgan('dev'));
app.use(authRouter);
app.use(trelloRouter);
app.use(errorMiddleware);

// start server
const server = module.exports = app.listen(PORT, () => {
  debug(`server up on ${server.address().port}`);
});

server.isRunning = true;
