const Redis = require('ioredis')
require('dotenv').config()

const client = new Redis({
    host:process.env.HOST,
    port:process.env.REDIS_PORT
})

client.on('connect',()=>{
    console.log("Redis connected!")
})
client.on('error',(error)=>{
    console.log(error)
})

module.exports = {client}