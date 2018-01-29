'use strict'

const co = require('co-express')
const stations = require('vbb-stations')
const api = require('vbb-client')

const template = require('./tpl/departures')

const departures = co(function* (req, res) {
	if (!req.query.station) return res.status(400).end('missing station')
	const station = stations(req.query.station)[0]
	if (!station) return res.status(400).end('invalid station')

	const when = req.query.when || new Date()

	const deps = yield api.departures(station.id, {
		when,
		identifier: 'vbb-web'
	})
	res.status(200).end(template(station, deps))
})

module.exports = departures
