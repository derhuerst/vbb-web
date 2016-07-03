'use strict'

const h = require('pithy')
const parse = require('vbb-parse-line')

const icon = require('./icon')



const line = (file, line) => {
	let type
	if (line === 'TXL') type = 'bus'
	else {
		const parsed = parse(line)
		type = parsed.type
		if (parsed.type !== 'regional' && parsed.type !== 'express') {
			if (parsed.metro) type = 'metro-' + type
			else if (parsed.express) type = 'express-' + type
			else if (parsed.night) type = 'night-' + type
		}
	}
	return [icon(file, type), h.a({href: '#'}, line)]
}

module.exports = line
