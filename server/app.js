const express = require('express');
const helloRouter = require('./routes/helloRouter');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expresValidator = require('express-validator');
const cors = require('cors');

mongoose.connect(process.env.MONGO_STR, {useNewUrlParser: true});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(expresValidator());
app.use(helloRouter);

module.exports = app;