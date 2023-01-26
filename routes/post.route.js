const express = require('express')
const router = express.Router()
const postController = require('../controllers/post.controller')

// create a new post
router.post('/newpost', postController.createPost);

// create a new post
router.get('/getposts', postController.createPost);

// create a new post
router.delete('/delete', postController.createPost);

module.exports = router 