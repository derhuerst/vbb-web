'use strict'

const template = require('./tpl/index')

const index = (req, res) => res.status(200).end(template())

module.exports = index
