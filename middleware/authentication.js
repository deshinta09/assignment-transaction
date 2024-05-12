const { compareToken } = require('../helpers/jwt')
const { User } = require('../models/')

async function authentication (req,res,next){
    try {
        let { authorization } = req.headers
        if(!authorization){
            res.status(401).json({message:'Invalid Token'})
        }

        let checkToken = compareToken(authorization.split(' ')[1])

        let user = await User.findByPk(checkToken.id)
        req.user = {
            id: user.id
        }
        next()
    } catch (error) {
        res.status(401).json({message:'Invalid Token'})
    }
}

module.exports = authentication