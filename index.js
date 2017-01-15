'use strict'

const fs = require('fs')
const config = require('config')
const https = require('https')
const http = require('http')

const app = require('./app')

const ssl = {
	  key:  fs.readFileSync(config.key)
	, cert: fs.readFileSync(config.cert)
	, ca:   fs.readFileSync(config.ca)
}



https.createServer(ssl, app)
.listen(config.ports.https, (err) => {
	console.info(`Listening on ${config.ports.https}.`)
})

http.createServer(app)
.listen(config.ports.http, () => {
	console.info(`Listening on ${config.ports.http}.`)
})
