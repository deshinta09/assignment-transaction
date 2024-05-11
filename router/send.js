const express = require('express')
const ControllerSend = require('../controller/controllerSend')
const route = express.Router()

route.post('/',ControllerSend.postSend)
route.get('/', ControllerSend.getAccountIncludeUser)

module.exports = route