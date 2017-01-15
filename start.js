'use strict'

const template = require('./tpl/start')

const start = (req, res) => res.status(200).end(template())

module.exports = start
