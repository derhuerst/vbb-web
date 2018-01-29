'use strict'

const h = require('pithy')

const icon = require('./icon')



const line = (line) => {
	let type = line.product
	if (line.product !== 'regional' && line.product !== 'express') {
		if (line.metro) type = 'metro-' + type
		else if (line.express) type = 'express-' + type
	}
	return [
		icon(type + '.svg', type),
		h.a({href: '#'}, line.name)
	]
}

module.exports = line
