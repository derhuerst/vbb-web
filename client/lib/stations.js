'use strict'

const api = require('vbb-client')

const stations = (query, cb) => {
	if (query.length === 0) return Promise.resolve([])
	return api.locations(query, {
		identifier: 'vbb-web', results: 5,
		stations: true, addresses: false, poi: false
	}).then(cb)
}

module.exports = stations
