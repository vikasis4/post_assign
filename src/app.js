const express = require('express');

const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const coreAuthRouter = require('./routes/coreApi');
const AppApiRouter = require('./routes/appApis/user');

const errorHandlers = require('./handlers/errorHandlers');
const isValidAuthToken = require('./middleware/isValidAuthToken')

// create our Express app
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// Here our API Routes
app.use('/api', AppApiRouter);
app.use('/api', isValidAuthToken, coreAuthRouter);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// production error handler
app.use(errorHandlers.productionErrors);

// done! we export it so we can start the site in start.js
module.exports = app;
