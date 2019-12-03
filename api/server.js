const express = require('express')
const db = require('../data/db')
const server = express()
server.use(express.json())
server.get('/', (req,res) => {
  res.send(`<h3>Oh hi there</h3>`)
})

server.post("/api/posts", (req,res) => {
  const newPost = req.body
  console.log(newPost)
  if(!(newPost.title && newPost.contents))res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  else{
    db.insert(newPost)
      .then(post => { res.status(201).json({newPost})})
      .catch(err => { res.status(500).json({ error: "There was an error while saving the post to the database" })})
  }

})

server.post("/api/posts/:id/comments", (req,res) => {
  const newPost = req.body
  if(!newPost)
  console.log(newPost)
})

server.get("/api/posts", (req,res) => {
  db.find()
    .then(posts => {res.status(200).json(posts)})
    .catch(err => res.status(500).json(`{ error: "The posts information could not be retrieved." }`))
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