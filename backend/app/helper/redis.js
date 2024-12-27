const redis = require("redis");

const client = redis.createClient({
    port:6379,
    host:"localhost"
})

client.on("connect", ()=>console.log("client connected to redis"))
client.on("ready", ()=>console.log("client connected to redis and ready to use"))
client.on("end", ()=>console.log("client disconnected from redis"))
client.on("error", (err)=>console.log(err.message))

process.on("SIGINT" , () => client.quit() )

module.exports = client