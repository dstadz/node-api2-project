const express = require('express')

const server = express()

server.get('/', (req,res) => {
  res.send(`<h3>Oh hi there</h3>`)
})

server.post("/api/posts", (req,res) => {
  const newPost = req.body
  console.log(newPost)
})

server.post("/api/posts/:id/comments", (req,res) => {
  const newPost = req.body
  console.log(newPost)
})

server.get("/api/posts", (req,res) => {
  const newPost = req.body
  console.log(newPost)
})

server.get("/api/posts/:id", (req,res) => {
  const newPost = req.body
  console.log(newPost)
})

server.get("/api/posts/:id/comments", (req,res) => {
  const newPost = req.body
  console.log(newPost)
})

server.delete("/api/posts/:id", (req,res) => {
  const newPost = req.body
  console.log(newPost)
})

server.put("/api/posts/:id", (req,res) => {
  const newPost = req.body
  console.log(newPost)
})


module.exports = server