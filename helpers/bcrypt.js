const bcrypt = require('bcryptjs')

const hashedPassword = (payload) => bcrypt.hashSync(payload,8)
const comparePassword = (password,hashed) => bcrypt.compareSync(password,hashed)

module.exports = {
    hashedPassword,
    comparePassword
}