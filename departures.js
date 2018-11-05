'use strict'

const createHafas = require('bvg-hafas')
const stations = require('vbb-stations')
const template = require('./tpl/departures')

const hafas = createHafas('vbb-web')

const departures = (req, res) => {
	if (!req.query.station) return res.status(400).end('missing station')
	const station = stations(req.query.station)[0]
	if (!station) return res.status(400).end('invalid station')

	hafas.departures(station.id, {
		when: req.query.when ? +new Date(req.query.when) : Date.now(),
		identifier: 'vbb-web'
	})
	.then((deps) => {
		res.status(200).end(template(station, deps))
	})
	.catch((err) => {
		if (process.env.NODE_ENV === 'dev') console.error(err.stack)
		const body = process.env.NODE_ENV === 'dev' ? err.stack : err.message
		res.status(err.statusCode || 500).end(body)
	})
}

module.exports = departures
