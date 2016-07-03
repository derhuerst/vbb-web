'use strict'

const completion = require('./lib/completion')
const stations = require('./lib/stations')

const suggest = (query, cb) => {
	if (query.length === 0 && localStorage.stations)
		return cb(JSON.parse(localStorage.stations))
	else stations(query, cb)
}

completion(document.getElementById('station'), {
	  suggest: suggest
	, render:  (l) => l.name
	, value:   (l) => l.id
})
.on('value', (l) => {
	let ls = localStorage.stations ? JSON.parse(localStorage.stations) : []
	ls = [l].concat(ls.filter((l2) => l2.id !== l.id)).slice(0, 5)
	localStorage.stations = JSON.stringify(ls)
})
