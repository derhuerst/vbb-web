'use strict'

const h = require('pithy')

const icon = (file) => new h.SafeString(`
	<svg class="icon" viewBox="0 0 100 100">
		<use xlink:href="${file}"/>
	</svg>
`)

module.exports = icon
