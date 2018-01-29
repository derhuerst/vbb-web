'use strict'

const h = require('pithy')

const pkg = require('../../package.json')

const safe = s => new h.SafeString(s)

const head = (stylesheets) => {
	stylesheets = stylesheets.map((href) => {
		return h.link({
			rel: 'stylesheet',
			type: 'text/css',
			href
		})
	})

	return h.head(null, [
		h.meta({charset: 'utf-8'}),
		h.title(null, pkg.name),
		h.meta({name: 'description', content: safe(pkg.description)}),
		h.meta({name: 'keywords', content: safe(pkg.keywords.join(', '))}),
		h.meta({name: 'author', content: safe(pkg.author)}),
		h.meta({name: 'viewport', content: 'width=device-width,initial-scale=1'})
	].concat(stylesheets))
}

module.exports = head
