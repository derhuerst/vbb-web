'use strict'

const h = require('pithy')

const icon = (file, item) => new h.SafeString(`
	<svg class="icon" viewBox="0 0 100 100">
		<use xlink:href="/${file}#${item}" href="/${file}#${item}" />
	</svg>
`)

module.exports = icon
