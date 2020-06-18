const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOptions = require("./config/swaggerConfig");
const httpError = require('http-errors');
const app = express();
const swaggerSpec = swaggerJsDoc(swaggerOptions);

const departmentRouter = require('./routes/departments');

/* app uses */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet()); // for http.header

/* call for swagger and other router */
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/departments', departmentRouter);

/* listing port for locally */
var port = process.env.PORT || 5000;
app.listen(port);

module.exports = app;
