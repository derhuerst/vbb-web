'use strict'

const fs = require('fs')
const config = require('config')
const express = require('express')
const forceSSL = require('express-force-ssl')
const compression = require('compression')
const files = require('serve-static')
const nocache = require('nocache')
const https = require('https')
const http = require('http')

const index = require('./index')
const departures = require('./departures')

const ssl = {
	  key:  fs.readFileSync(config.key)
	, cert: fs.readFileSync(config.cert)
	, ca:   fs.readFileSync(config.ca)
}



const app = express()
app.set('forceSSLOptions', {httpsPort: config.ports.https})
app.use(forceSSL)
app.use(compression())
app.use(files('./client'))

app.get('/', index)
app.get('/departures', nocache(), departures)



const secure = https.createServer(ssl, app)
secure.listen(config.ports.https, () =>
	console.info(`Listening on ${config.ports.https}.`))
const insecure = http.createServer(app)
insecure.listen(config.ports.http, () =>
	console.info(`Listening on ${config.ports.http}.`))
