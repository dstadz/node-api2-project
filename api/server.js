const express = require('express')

const server = express()

server.get('/', (req,res) => {
  res.send(`<h3>Oh hi there</h3>`)
})

module.exports = server