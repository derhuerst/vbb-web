'use strict'

const createClient = require('vbb-client')

const client = createClient({
	endpoint: 'https://1.bvg.transport.rest'
})

const stations = (query, cb) => {
	if (query.length === 0) return Promise.resolve([])

	return client.locations(query, {
		fuzzy: true,
		poi: false,
		addresses: false,
		stationLines: false,
		results: 5,
		identifier: 'vbb-web'
	})
	.then(cb)
	.catch((err) => {
		console.error(err)
		cb([])
	})
}

module.exports = stations
