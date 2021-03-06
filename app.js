require('dotenv').config()

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const routes = require('./routes')
const passport = require('passport')

require('./config/passport')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())

app.use('/static', express.static(path.resolve(__dirname, 'static')))

app.use('/', routes)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
})

module.exports = app
