'use strict'

const h = require('pithy')

const icon = (file, type) =>
	new h.SafeString(`<svg class="icon" viewBox="0 0 100 100">
		<use xlink:href="${file}#${type}"/>
	</svg>`)

module.exports = icon
