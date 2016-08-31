'use strict'

const h = require('pithy')

const footer = h.footer({id: 'footer'}, [
	h.p(null, [
		  h.a({href: 'https://github.com/derhuerst/vbb-web'}, [
			h.abbr({title: 'Free Open Source Software'}, 'FOSS')
		])
		, ' made with '
		, h.span({class: 'love'}, '❤')
		, ' by '
		, h.a({href: 'http://jannisr.de'}, '@derhuerst')
		, '.'
	]),
	h.p(null, [
		  'Search powered by '
		, h.a({href: 'https://algolia.com/'}, 'Algolia')
		, '.'
	])
])

module.exports = footer
