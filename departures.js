'use strict'

const stations = require('vbb-stations')
const api = require('vbb-client')

const template = require('./tpl/departures')

const departures = (req, res) => {
	if (!req.query.station) return res.status(400).end('missing station')
	const station = stations(req.query.station)[0]
	if (!station) return res.status(400).end('invalid station')

	const when = req.query.when || new Date()

	api.departures(station.id, {
		when,
		identifier: 'vbb-web'
	})
	.then((deps) => {
		res.status(200).end(template(station, deps))
	})
	.catch((err) => {
		const body = process.env.NODE_ENV === 'dev' ? err.stack : err.message
		res.status(err.statusCode || 500).end(body)
	})
}

module.exports = departures
