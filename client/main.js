'use strict'

const completion = require('./lib/completion')
const client = require('vbb-client')

const $ = (s) => document.querySelector(s)



completion($('#station'), {
	  suggest: (query, cb) => {
		if (query.length === 0) return cb([])
		client.locations(query, {
			identifier: 'vbb-web', results: 5,
			stations: true, addresses: false, poi: false
		}).then(cb)
	}
	, render:  (l) => l.name
	, value:   (l) => l.id
})
