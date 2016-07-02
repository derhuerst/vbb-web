'use strict'

const time = require('parse-messy-time')

const $ = (s) => document.querySelector(s)



$('#when').addEventListener('change', (e) => {
	console.log(time(e.target.value))
})
