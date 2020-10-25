'use strict'

const {homepage} = require('../../package.json')

const ENDPOINT = 'https://v5.bvg.transport.rest/locations'

const stations = (query, cb) => {
	if (query.length === 0) return Promise.resolve([])

	const searchParams = new URLSearchParams({
		query,
		fuzzy: true,
		poi: false,
		addresses: false,
		linesOfStops: false,
		results: 5,
	}).toString()

	fetch(ENDPOINT + '?' + searchParams, {
		headers: {
			'user-agent': homepage,
		},
		mode: 'cors',
		redirect: 'follow',
	})
	.then((res) => {
		if (!res.ok) {
			const err = new Error(res.statusText)
			err.statusCode = res.status
			throw err
		}
		return res.json()
	})
	.then(cb)
	.catch((err) => {
		console.error(err)
		cb([])
	})
}

module.exports = stations
