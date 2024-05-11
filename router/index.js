const express = require('express')
const route = express.Router()
const routerSend = require('./send')
const routerWithdraw = require('./withdraw')
const routerUser = require('./user')
const authentication = require('../middleware/authentication')

route.use('/', routerUser)
route.use('/send', authentication, routerSend)
route.use('/withdraw', authentication, routerWithdraw)

module.exports = route