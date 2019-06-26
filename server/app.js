const express = require('express');
const teamRouter = require('./routes/teamRouter');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expresValidator = require('express-validator');
const cors = require('cors');

mongoose.connect(process.env.MONGO_STR, {useNewUrlParser: true});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(expresValidator());
app.use(teamRouter);

module.exports = app;