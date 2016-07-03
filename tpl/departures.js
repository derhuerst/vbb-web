'use strict'

const h = require('pithy')
const moment = require('moment')
const shorten = require('vbb-short-station-name')

const line = require('./lib/line')
const completion = require('./lib/completion')
const enableJS = require('./lib/enable-js')
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



const form = (station) =>
	h.form({action: '/departures', method: 'GET'}, [
		completion({
			  id: 'station', name: 'station'
			, placeholder: 'search for a station'
			, text: station.name, value: station.id
		}),
		h.input({
			type: 'text', name: 'when', value: 'in 10 min',
			placeholder: 'specify a time'
		}),
		h.input({type: 'submit', value: 'show departures'})
	])



const page = (station, deps) => {
	station.name = shorten(station.name)
	return [
		  `<!DOCTYPE html>`
		, h.html({lang: 'en'}, [
			  head(['main.css'])
			, h.body(null, [
				  h.h1(null, station.name)
				, enableJS
				, departures(deps)
				, form(station)
			])
			, h.script({type: 'application/javascript', src: 'main.bundle.min.js'})
		])
	].join('\n')
}



module.exports = page
