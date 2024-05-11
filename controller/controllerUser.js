const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { User } = require('../models/')

class ControllerUser {
    static async login(req,res){
        const { email, password } = req.body
        let findUser = await User.findOne({
            where: {
                email
            }
        })
        if(!findUser){
            res.status(402).json({message:'Invalid email/password'})
        }else if(!comparePassword(password,findUser.password)){
            res.status(402).json({message:'Invalid email/password'})
        } else {
            const access_token = createToken({id:findUser.id})
    
            res.status(200).json({access_token})
        }
    }

    static async register(req,res){
        try {
            const { email, password } = req.body
            let newUser = await User.create({ email, password })

            res.status(201).json({
                id:newUser.id,
                email:newUser.email
            })
        } catch (error) {
            res.status(500).json({message:'Internal Server Error'})
        }
    }
}

module.exports = ControllerUser