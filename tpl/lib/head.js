'use strict'

const h = require('pithy')

const pkg = require('../../package.json')



const head = (stylesheets) => {
	stylesheets = stylesheets.map((ss) =>
		h.link({rel: 'stylesheet', type: 'text/css', href: ss}))
	return h.head(null, [
		  h.meta({charset: 'utf-8'})
		, h.title(null, pkg.name)
		, h.meta({name: 'description', content: pkg.description})
		, h.meta({name: 'keywords', content: pkg.keywords.join(', ')})
		, h.meta({name: 'author', content: pkg.author})
		, h.meta({name: 'viewport', content: 'width=device-width,initial-scale=1'})
	].concat(stylesheets))
}

module.exports = head
