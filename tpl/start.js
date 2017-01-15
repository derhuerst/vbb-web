'use strict'

const h = require('pithy')

const vbbTelegram = require('./lib/vbb-telegram')
const completion = require('./lib/completion')
const enableJS = require('./lib/enable-js')
const head = require('./lib/head')
const footer = require('./lib/footer')



const form = (station) =>
	h.form({action: 'departures', method: 'GET'}, [
		completion({
			  id: 'station', name: 'station'
			, placeholder: 'search for a station'
			, text: '', value: ''
		}),
		h.input({
			type: 'text', name: 'when', value: 'in 10 min',
			placeholder: 'specify a time'
		}),
		h.input({type: 'submit', value: 'show departures'})
	])



const page = (station, deps) => [
	  `<!DOCTYPE html>`
	, h.html({lang: 'en'}, [
		head(['main.css']),
		h.body(null, [
			  h.h1(null, 'Departures')
			, enableJS
			, form(station)
			, vbbTelegram
			, footer
			, h.script({type: 'application/javascript', src: 'index.bundle.min.js'})
		])
	])
].join('\n')



module.exports = page
