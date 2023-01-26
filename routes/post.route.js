const express = require('express')
const router = express.Router()
const postController = require('../controllers/post.controller')

// create a new post
router.post('/newpost', postController.createPost);

module.exports = router 