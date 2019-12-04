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
  const {id} = req.params.id
  const post = db.findById(id)
  const com = req.body
  console.log(com, id, post)
  const { postId, text } = com


  //   - If the _post_ with the specified `id` is not found: -- return HTTP status code `404` (Not Found). -- return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.
    if(!id) res.status(404).json({ message: "The post with the specified ID does not exist." })


// - If the request body is missing the `text` property: -- cancel the request. -- respond with HTTP status code `400` (Bad Request). -- return the following JSON response: `{ errorMessage: "Please provide text for the comment." }`.
    else if (text) res.status(400).json({ errorMessage: "Please provide text for the comment." })


// - If the information about the _comment_ is valid: -- save the new _comment_ the the database. -- return HTTP status code `201` (Created). -- return the newly created _comment_.
    else res.status(201).json({com})

    db.insertComment(com)
      .then(ment => {
        console.log(ment)
      })
// - If there's an error while saving the _comment_: -- cancel the request. -- respond with HTTP status code `500` (Server Error). -- return the following JSON object: `{ error: "There was an error while saving the comment to the database" }`.
  .catch(err => {
    console.log('goofed with :', err)
    res.status(500).json({ error: "There was an error while saving the comment to the database" })
  })


  
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