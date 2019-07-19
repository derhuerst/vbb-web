'use strict'

const h = require('pithy')
const { DateTime } = require('luxon')
const ms = require('ms')
const shorten = require('vbb-short-station-name')

const line = require('./lib/line')
const head = require('./lib/head')

const timezone = process.env.TIMEZONE
if (!timezone) {
	console.error('Missing TIMEZONE env var.')
	process.exit(1)
}
const locale = process.env.LOCALE
if (!locale) {
	console.error('Missing LOCALE env var.')
	process.exit(1)
}

const time = (iso, props = {}) => {
	return h.time(Object.assign({datetime: iso}, props), [
		DateTime.fromISO(iso, {zone: timezone, locale}).toLocaleString(DateTime.TIME_SIMPLE)
	])
}

const realtimeAndPlanned = (t, delay) => {
	const realtimeIso = new Date(t).toISOString()
	const isRealtime = delay !== null
	const isDelayed = isRealtime && delay > 0

	const classes = [
		isRealtime && 'departure-realtime',
		isDelayed && 'departure-delayed'
	].filter(cls => !!cls).join(' ')
	const els = [
		time(realtimeIso, classes ? {class: classes} : {})
	]
	if (isRealtime && delay !== 0) {
		const plannedIso = new Date(new Date(t) - delay * 1000).toISOString()
		els.push(h.del({}, [
			time(plannedIso, {class: 'departure-delay'})
		]))
	}

	return els
}

const delaySign = d => d > 0 ? '+' : '-'

const delay = d => Math.abs(d) > 1000 ? ' ' + delaySign(d) + ms(Math.abs(d)) : ''

const departures = (deps) => {
	return h.table('#departures', deps.map((dep) => {
		return h.tr(null, [
			h.td('.departures-when', realtimeAndPlanned(dep.when, dep.delay)),
			h.td('.departures-line', [
				line(dep.line)
			]),
			h.td('.departures-direction', [
				'→ ' + dep.direction
			])
		])
	}))
}

const moreDeparturesForm = (stationId, lastDeparture) => {
	return h.form({action: 'departures', method: 'GET'}, [
		h.input({
			type: 'hidden',
			name: 'station',
			value: stationId
		}),
		h.input({
			type: 'hidden',
			name: 'when',
			value: new Date(lastDeparture).toISOString()
		}),
		h.input({
			type: 'submit',
			value: 'more departures'
		})
	])
}

const noDepartures = h.p({}, 'no departures')

const page = (station, deps) => {
	station.name = shorten(station.name)
	const lastDep = deps[deps.length - 1]

	return [
		  `<!DOCTYPE html>`
		, h.html({lang: 'en'}, [
			head(['main.css']),
			h.body(null, [
				  h.h1(null, station.name)
				, deps.length > 0 ? departures(deps) : noDepartures
				, lastDep ? moreDeparturesForm(station.id, lastDep.when) : ''
			])
		])
	].join('\n')
}

module.exports = page
