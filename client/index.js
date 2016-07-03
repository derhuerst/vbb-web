'use strict'

const completion = require('./lib/completion')
const stations = require('./lib/stations')

completion(document.getElementById('station'), {
	  suggest: (query, cb) => stations(query).then(cb)
	, render:  (l) => l.name
	, value:   (l) => l.id
})
