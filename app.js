'use strict'

const config = require('config')
const express = require('express')
const forceSSL = require('express-force-ssl')
const compression = require('compression')
const files = require('serve-static')
const path = require('path')
const nocache = require('nocache')

const start = require('./start')
const departures = require('./departures')



const app = express()
app.set('forceSSLOptions', {httpsPort: config.ports.https})
app.use(forceSSL)
app.use(compression())
app.use(files(path.join(__dirname, 'client')))

app.get('/', start)
app.get('/departures', nocache(), departures)

module.exports = app
