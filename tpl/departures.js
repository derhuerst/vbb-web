'use strict'

const h = require('pithy')
const moment = require('moment-timezone')
const shorten = require('vbb-short-station-name')

const cfg = require('config')
const line = require('./lib/line')
const head = require('./lib/head')



const time = (t) => h.time({
	datetime: new Date(t).toISOString()
}, [
	moment(t).tz(cfg.timezone).locale(cfg.locale).format('LT')
])

const direction = (s) => '→ ' + s

const departures = (deps) =>
	h.table('#departures', deps.map((dep) => h.tr(null, [
		  h.td('.departures-when', [time(dep.when)])
		, h.td('.departures-line', [line(dep.product.line)])
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
