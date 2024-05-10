const Redis = require('ioredis')
require('dotenv').config()

const client = new Redis(process.env.INTERNAL_URL)

client.on('connect',()=>{
    console.log("Redis connected!")
})
client.on('error',(error)=>{
    console.log(error)
})

module.exports = {client}