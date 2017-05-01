'use strict'

const http = require('http')

const app = require('./app')

const port = process.env.PORT || 3000
const hostname = process.env.HOSTNAME || ''

http.createServer(app)
.listen(port, (err) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.info(`Listening on ${hostname}:${port}.`)
})
