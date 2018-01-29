'use strict'

const h = require('pithy')

const icon = require('./icon')

const line = (line) => {
	let cls = line.product
	if (line.product !== 'regional' && line.product !== 'express') {
		if (line.metro) cls = 'metro-' + cls
		else if (line.express) cls = 'express-' + cls
	}
	return [
		icon(cls + '.svg', cls),
		h.a({href: '#'}, line.name)
	]
}

module.exports = line
