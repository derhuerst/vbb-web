'use strict'

const h = require('pithy')

const enableJS = h.noscript(null, [
	h.p({class: 'notification error'}, 'Please enable JavaScript.')
])

module.exports = enableJS
