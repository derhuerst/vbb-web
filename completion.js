'use strict'

const Emitter = require('component-emitter')
const horsey = require('horsey')



const yes = () => true
const id = (x) => x

const completion = (container, opt) => {
	const out = new Emitter()
	const input = container.querySelector('input')
	const completion = horsey(input, {
		  suggestions: opt.suggest, appendTo: container
		, filter: yes, getText: opt.text, getValue: id
		, set: (l) => {
			completion.clear()
			opt.apply(input, l)
			out.emit('value', l)
			setTimeout(() => input.blur(), 10)
		}
	})
	completion.hide()
	return out
}

module.exports = completion
