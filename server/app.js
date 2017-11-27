const app = require('express')();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient
const morgan = require('morgan')
const jwt = require('jsonwebtoken');
const FB = require('fb')
const cors = require('cors')
const axios = require('axios')

require('dotenv').config() 
app.use(cors())

logger = require('morgan'),
app.use(logger('dev'))

mongoose.connect(process.env.DB)
// mongoose.connect('mongodb://localhost:27017/blog');

// const url = 'mongodb://localhost:27017/library';

const User = require('./routers/user')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', User)


app.listen(3010)