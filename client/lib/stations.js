'use strict'

const api = require('vbb-client')

const stations = (query, cb) => {
	if (query.length === 0) return Promise.resolve([])
	return api.stations({
		query, fuzzy: true, results: 5,
		identifier: 'vbb-web'
	}).then(cb)
}

module.exports = stations
