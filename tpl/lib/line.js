'use strict'

const h = require('pithy')
const parse = require('vbb-parse-line')

const icon = require('./icon')



const line = (line) => {
	let type = line.product
	if (line.type !== 'regional' && line.type !== 'express') {
		if (line.metro) type = 'metro-' + type
		else if (line.express) type = 'express-' + type
	}
	return [
		icon(type + '.svg', type),
		h.a({href: '#'}, line.name)
	]
}

module.exports = line
