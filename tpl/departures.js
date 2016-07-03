'use strict'

const h = require('pithy')
const moment = require('moment')
const shorten = require('vbb-short-station-name')

const line = require('./lib/line')
const head = require('./lib/head')



const time = (t) => h.time({
	datetime: new Date(t).toISOString()
}, [moment(t).format('LT')])

const direction = (s) => '→ ' + s

const departures = (deps) =>
	h.table('#departures', deps.map((dep) => h.tr(null, [
		  h.td('.departures-when', [time(dep.when)])
		, h.td('.departures-line', [line('icons.svg', dep.product.line)])
		, h.td('.departures-direction', [direction(dep.direction)])
	])))



const page = (station, deps) => {
	station.name = shorten(station.name)
	return [
		  `<!DOCTYPE html>`
		, h.html({lang: 'en'}, [
			head(['main.css']),
			h.body(null, [
				  h.h1(null, station.name)
				, departures(deps)
			])
		])
	].join('\n')
}

module.exports = page
