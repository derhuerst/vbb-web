'use strict'

const h = require('pithy')

const vbbTelegram = h.p(null, [
	  'Have Telegram? Check the '
	, h.a({href: 'https://telegram.me/public_transport_bot'}, 'VBB Telegram bot')
	, '!'
])

module.exports = vbbTelegram
