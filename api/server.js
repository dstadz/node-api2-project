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
      .then(() => { res.status(201).json({newPost})})
      .catch(() => { res.status(500).json({ error: "There was an error while saving the post to the database" })})
  }

})

server.post("/api/posts/:id/comments", (req,res) => {
  const id = req.params.id

  //shoutout to Nadeem for this line
  req.body.post_id = id
  const com = req.body
  db.findById(id)
    .then(post =>{
      console.log(post)
      if(post.length===0) res.status(404).json({ message: "The post with the specified ID does not exist." })
      else if (!com.text) res.status(400).json({ errorMessage: "Please provide text for the comment." })
      else{
        console.log('posting')
        db.insertComment(com)
        .then(com => {
          console.log("com:",com)
          res.status(201).json(com)
        })
        .catch(err => {
          console.log('goofed with :', err)
          res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
      }
    })
    .catch(err => console.log(err))
})

server.get("/api/posts", (req,res) => {
  db.find()
    .then(posts => {res.status(200).json(posts)})
    .catch(err => res.status(500).json(`{ error: "The posts information could not be retrieved." }`))
})

//why does it return an array?
server.get("/api/posts/:id", (req,res) => {
const id = req.params.id
db.findById(id)
  .then(post => {
    if(!post) res.status(404).json({ message: "The post with the specified ID does not exist."})
    else res.status(200).json(post[0])
  })
  .catch(err => {
    console.log("goofed with:", err)
    res.status(500).json({error: "The post information could not be retrieved."})
  })
})

server.get("/api/posts/:id/comments", (req,res) => {
  const id = req.params.id
  db.find(id)
  .then(com => {
    if(!!com.length) {
      db.findPostComments(id)
        .then(id => {
          console.log('ment:', id)
          res.status(200).json(id)
        })
    }
    else res.status(404).json({message: "The post with the specified ID does not exist."})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: "The post information could not be retrieved."})
  })
})

server.delete("/api/posts/:id", (req,res) => {
  const id = req.params.id
  db.remove(id)
    .then(deletedUser => {
      if (deletedUser) res.status(200).json({ message: 'The post has been executed.' })
      else res.status(404).json({  message: "The post with the specified ID does not exist." })
    })
    .catch(() => {
      console.log('you done goofed with:', err)
      res.status(500).json({ error: 'The post could not be removed' })
    });
});

server.put("/api/posts/:id", (req,res) => {
  const id = req.params.id
  const edit = req.body
  db.findById(id)
  .then(rex => {
    if(!!!rex.length) res.status(404).json({ message: "The post with the specified ID does not exist." })
    else if(!edit.title || !edit.contents ) res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    else{
      console.log('activate update')
      db.update(id,edit)
      .then(() =>{
        res.status(200).json(edit)
      })
    }
  })
  .catch(err => { res.status(500).json({ error: "The post information could not be modified." })})
})


module.exports = server