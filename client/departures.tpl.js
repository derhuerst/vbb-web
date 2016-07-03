'use strict'

const h = require('pithy')
const parse = require('vbb-parse-line')
const moment = require('moment')
const shorten = require('vbb-short-station-name')

const pkg = require('../package.json')



const enableJS = new h.SafeString(`
<noscript>
	<p class="notification error">Please enable JavaScript.</p>
</noscript>`)



const time = (t) => h.time({
	datetime: new Date(t).toISOString()
}, [moment(t).format('LT')])

const icon = (file, type) => new h.SafeString(`
<svg class="icon" viewBox="0 0 100 100">
	<use xlink:href="${file}#${type}"/>
</svg>`)

const line = (file, p) => {
	let type
	p = parse(p.line)
	if (p._ === 'TXL') type = 'bus'
	else {
		type = p.type
		if (p.type !== 'regional' && p.type !== 'express') {
			if (p.metro) type = 'metro-' + type
			else if (p.express) type = 'express-' + type
			else if (p.night) type = 'night-' + type
		}
	}
	return [icon(file, type), h.a({href: '#'}, p._)]
}

const direction = (s) => '→ ' + s

const departures = (deps) =>
	h.table('#departures', deps.map((dep) => h.tr(null, [
		  h.td('.departures-when', [time(dep.when)])
		, h.td('.departures-line', [line('icons.svg', dep.product)])
		, h.td('.departures-direction', [direction(dep.direction)])
	])))



const form = (station) => h.form({action: '/departures', method: 'GET'}, [
	  h.fieldset('#station.completion', [
		h.input({class: 'ui', type: 'text', placeholder: 'search for a station', value: station.name}),
		h.input({class: 'field', type: 'hidden', name: 'station', value: station.id})
	])
	, h.input({
		type: 'text', name: 'when', value: 'in 10 min',
		placeholder: 'specify a time'
	})
	, h.input({type: 'submit', value: 'show departures'})
])

const page = (station, deps) => {
	station.name = shorten(station.name)
	return [
		  `<!DOCTYPE html>`
		, h.html({lang: 'en'}, [
			  h.head(null, [
				  h.meta({charset: 'utf-8'})
				, h.title(null, pkg.name)
				, h.meta({name: 'description', content: pkg.description})
				, h.meta({name: 'keywords', content: pkg.keywords.join(', ')})
				, h.meta({name: 'author', content: pkg.author})
				, h.meta({name: 'viewport', content: 'width=device-width,initial-scale=1'})
				, h.link({rel: 'stylesheet', type: 'text/css', href: 'main.css'})
			])
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
