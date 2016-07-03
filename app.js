'use strict'

const fs = require('fs')
const config = require('config')
const express = require('express')
const compression = require('compression')
const files = require('serve-static')
const https = require('https')

const index = require('./index')
const departures = require('./departures')

const ssl = {
	  key:  fs.readFileSync(config.key)
	, cert: fs.readFileSync(config.cert)
	, ca:   fs.readFileSync(config.ca)
}



const app = express()
app.use(compression())
app.use(files('./client'))

app.get('/', index)
app.get('/departures', departures)



const server = https.createServer(ssl, app)
server.listen(config.port, () =>
	console.info(`Listening on ${config.port}.`))
