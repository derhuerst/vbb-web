'use strict'

const h = require('pithy')

const completion = (opt) => {
	return h.fieldset({
		id: opt.id,
		class: 'completion'
	}, [
		h.input({
			class: 'ui',
			type: 'text',
			placeholder: opt.placeholder,
			value: opt.text
		}),
		h.input({
			class: 'field',
			type: 'hidden',
			name: opt.name,
			value: opt.value
		})
	])
}

module.exports = completion
