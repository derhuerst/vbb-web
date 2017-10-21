'use strict'

const h = require('pithy')
const moment = require('moment-timezone')
const ms = require('ms')
const shorten = require('vbb-short-station-name')

const line = require('./lib/line')
const head = require('./lib/head')

const timezone = process.env.TIMEZONE
const locale = process.env.LOCALE



const time = (t) => h.time({
	datetime: new Date(t).toISOString()
}, [
	moment(t).tz(timezone).locale(locale).format('LT')
])

const delaySign = (d) => d > 0 ? '+' : '-'

const delay = (d) => Math.abs(d) > 1000 ? ` ${delaySign(d)}${ms(Math.abs(d))}` : ''

const direction = (s) => '→ ' + s

const departures = (deps) =>
	h.table('#departures', deps.map((dep) => h.tr(null, [
		  h.td('.departures-when', [
			  time(dep.when)
			, h.span('.departures-delay', [delay(dep.delay)])
		  ])
		, h.td('.departures-line', [line(dep.line)])
		, h.td('.departures-direction', [direction(dep.direction)])
	])))

const moreDeparturesForm = (stationId, lastDeparture) =>
	h.form({action: 'departures', method: 'GET'}, [
		h.input({
			type: 'hidden', name: 'station', value: stationId
		}),
		h.input({
			type: 'hidden', name: 'when', value: new Date(lastDeparture).toISOString()
		}),
		h.input({type: 'submit', value: 'more departures'})
	])


const page = (station, deps) => {
	station.name = shorten(station.name)
	return [
		  `<!DOCTYPE html>`
		, h.html({lang: 'en'}, [
			head(['main.css']),
			h.body(null, [
				  h.h1(null, station.name)
				, departures(deps)
				, moreDeparturesForm(station.id, deps[deps.length - 1].when)
			])
		])
	].join('\n')
}

module.exports = page
