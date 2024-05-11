const jwt = require('jsonwebtoken')
const buffer = process.env.secret

const createToken = (payload) => jwt.sign(payload,buffer)
const compareToken = (token) => jwt.verify(token,buffer)

module.exports = {
    createToken,
    compareToken
}