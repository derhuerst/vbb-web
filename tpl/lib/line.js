'use strict'

const h = require('pithy')
const parse = require('vbb-parse-line')

const icon = require('./icon')



const line = (line) => {
	let type
	if (line === 'TXL') type = 'bus'
	else {
		const parsed = parse(line)
		type = parsed.type
		if (parsed.type !== 'regional' && parsed.type !== 'express') {
			if (parsed.metro) type = 'metro-' + type
			else if (parsed.express) type = 'express-' + type
		}
	}
	return [icon(type + '.svg'), h.a({href: '#'}, line)]
}

module.exports = line
