if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}
const express = require('express')
const router = require('./router/index')
const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(router)

app.listen(port,console.log(`listen on port ${port}`))