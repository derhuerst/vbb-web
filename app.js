'use strict'

const config = require('config')
const express = require('express')
const compression = require('compression')
const files = require('serve-static')

const departures = require('./departures')



const app = express()
app.use(compression())
app.use(files('./client'))

app.get('/departures', departures)

app.listen(config.port, () => console.info(`Listening on ${config.port}.`))
