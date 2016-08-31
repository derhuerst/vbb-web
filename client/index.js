'use strict'

const algolia = require('algoliasearch')
const completion = require('./lib/completion')

const index = algolia('MVGP4CETQJ', '80552d0732ea6e2f1a0bfd784463392c')
.initIndex('db-stations-1')

const suggest = (query, cb) => {
	if (query.length === 0 && localStorage.stations)
		return cb(JSON.parse(localStorage.stations))
	else index.search(query, (err, results) => {
		if (!err) cb(results.hits)
	})
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
