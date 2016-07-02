'use strict'

const completion = require('./completion')
const client = require('vbb-client')

const $ = (s) => document.querySelector(s)



completion($('#location'), {
	  suggest: (query, cb) => {
		if (query.length === 0) return cb([])
		client.locations(query, {identifier: 'vbb-web', results: 5}).then(cb)
	}
	, text:    (l) => l.name
	, apply:   (el, l) => el.value = l.name
})
.on('value', (l) => console.log(l))
