const express = require('express')
const route = express.Router()
const routerSend = require('./send')
const routerWithdraw = require('./withdraw')
const routerUser = require('./user')
const authentication = require('../middleware/authentication')
const ControllerSend = require('../controller/controllerSend')

route.use('/', routerUser)
route.post('/paymentAccount', authentication, ControllerSend.createAccount)
route.use('/send', authentication, routerSend)
route.use('/withdraw', authentication, routerWithdraw)

module.exports = route